// Router.js is a javascript routing library without any dependencies.
(function (window) {

    // Array to store registered routes.
    var routesPool = [],

        // Method to get default configurations.
        getDefaultConfig = function () {
            return {
                canRepeat: false
            };
        },

        // Object to store regex srting.
        regexString = {
            alphaNumeric: '[a-zA-Z0-9_]+',
            parameter: ':[a-zA-Z0-9_]+'
        },

        // Object to store regex expression.
        regexEnum = {
            alphaNumeric: new RegExp('^' + regexString.alphaNumeric + '$'),
            parameter: new RegExp('^' + regexString.parameter + '$')
        },

        // Object to store helper methods.
        helperMethods = {
            // Method to copy contents of all object to first object.
            extend: function () {
                var newObject = {};
                for (var idx in arguments) {
                    for (var objName in arguments[idx]) {
                        newObject[objName] = arguments[idx][objName];
                    };
                };

                return newObject;
            },

            // Method to parse and register routes.
            parseRoute: function (routeFormat, routeCallback) {
                var route = {},
                    parsedRouteFormat = this.buildRegex(routeFormat);

                route.name = routeFormat;
                route.regex = parsedRouteFormat.routeRegex;
                route.callback = routeCallback;
                route.arguments = parsedRouteFormat.argumentsList || [];

                routesPool.push(route);
            },

            // Method to build regex for routes. It returns array.
            buildRegex: function (routeFormat) {
                var parsedObject = {},
                    routeFormatArray = routeFormat.split('/'),
                    mainRegex = [],
                    argsRegex = [],
                    routeRegex = '';

                // Build mainRegex array and argsRegex array.
                routeFormatArray.forEach(function (value) {
                    if (!value) throw 'Invalid route format';

                    if (regexEnum.alphaNumeric.test(value) && !argsRegex.length) {
                        mainRegex.push(value);
                    }
                    else if (regexEnum.parameter.test(value)) {
                        argsRegex.push(value.slice(1));
                    }
                    else {
                        throw 'Invalid route format';
                    };
                });

                // Construct routeRegex string from mainRegex string.
                if (mainRegex.length) {
                    routeRegex = mainRegex.join('/');
                };

                // Append argsRegex string to routeRegex.
                argsRegex.forEach(function (value) {
                    routeRegex = routeRegex + '/' + regexString.parameter;
                });

                // Construct routeRegex string.
                routeRegex = '^' + routeRegex + '$';
                parsedObject.routeRegex = new RegExp(routeRegex);

                // argsRegex contains arguments list.
                parsedObject.argumentsList = argsRegex;

                return parsedObject;
            },

            // Method to get all matched routes. It returns array.
            getMatchedRoutes: function (routePath) {
                var matchedRoutes = [];
                for (var routeIndex in routesPool) {
                    if (routesPool[routeIndex].regex.test(routePath)) {
                        matchedRoutes.push(routesPool[routeIndex]);
                    }
                }
                return matchedRoutes;
            },

            // Method to extract arguments from route path. It returns array.
            extractArgumentsFromRoutePath: function (routePath) {
                var routeArguments = [],
                    routePathArray = routePath.split('/');

                routePathArray.forEach(function (value) {
                    if (regexEnum.parameter.test(value)) {
                        routeArguments.push(value.slice(1));
                    }
                });

                return routeArguments;
            }
        };

    // Class to handle routes.
    var Router = function (config) {
        this.config = helperMethods.extend(getDefaultConfig(), config || {});
        this.previousRoute = null;
    };

    // Method to register routes.
    Router.prototype.registerRoute = function (routes) {
        try {
            for (var routeFormat in routes) {
                helperMethods.parseRoute(routeFormat, routes[routeFormat]);
            };
        } catch (e) {
            console.error(e);
        }
    };

    // Method to parse routepath and trigger matched callbacks.
    Router.prototype.route = function (routePath, extraArgs) {
        var me = this,
            matchingRoutes = helperMethods.getMatchedRoutes(routePath),
            routeArguments = helperMethods.extractArgumentsFromRoutePath(routePath),
            canRepeat = extraArgs ? ((typeof extraArgs.forceRepeat === 'boolean') ? extraArgs.forceRepeat : me.config.canRepeat) : me.config.canRepeat;

        routeArguments.push(extraArgs || {});
        if (canRepeat || (me.previousRoute !== routePath)) {
            me.previousRoute = routePath;
            for (var routeIdx in matchingRoutes) {
                me._triggerRoute(matchingRoutes[routeIdx], routeArguments);
            };
        };
    };

    // Method to trigger route callback function.
    Router.prototype._triggerRoute = function (route, args) {
        route.callback && route.callback.apply({ args: args }, args);
    };

    // Export Router class.
    if (define && (typeof define === 'function') && define.amd) {
        define('Router', function () { return Router; })
    }
    else {
        window.Router = Router;
    };
})(window);