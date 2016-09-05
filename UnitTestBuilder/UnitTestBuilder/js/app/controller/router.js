(function (window) {

    var getDefaultConfig = function () {
        return {
            canRepeat: false
        };
    },
        regexEnum = {
            alphaNumeric: new RegExp('^[a-zA-Z0-9_]+$'),
            parameter: new RegExp('^:[a-zA-Z0-9_]+$')
        },
        helperMethods = {
            extend: function () {
                var newObject = {};
                for (idx in arguments) {
                    for (objName in arguments[idx]) {
                        newObject[objName] = arguments[idx][objName];
                    };
                };

                return newObject;
            },
            parseRoute: function (routeFormat, routeCallback) {
                var route = {},
                    name = routeFormat.split(':')[0].slice(0, -1),
                    parsedRouteFormat = this.buildRegex(routeFormat);
                route.regex = parsedRouteFormat.routeRegex;
                route.callback = routeCallback;
                route.arguments = parsedRouteFormat.argumentsList || [];

                routesPool[name] = route;
            },
            buildRegex: function (routeFormat) {
                var parsedObject = {},
                    routeFormatArray = routeFormat.split('/'),
                    mainRegex = [],
                    argsRegex = [],
                    routeRegex = '';

                routeFormatArray.forEach(function (value) {
                    if (!value) throw 'Invalid route format';

                    if (regexEnum.alphaNumeric.test(value) && argsRegex.length) {
                        mainRegex.push(value);
                    }
                    else if (regexEnum.parameter.test(value)) {
                        argsRegex.push(value.slice(1));
                    }
                    else {
                        throw 'Invalid route format';
                    };
                });

                if (mainRegex.length) {
                    routeRegex = mainRegex.join('/');
                };
                argsRegex.forEach(function (value) {
                    routeRegex = routeRegex + '/:[a-zA-Z0-9_]+';
                });

                routeRegex = '^' + routeRegex + '$'

                parsedObject.argumentsList = argsRegex;
                parsedObject.routeRegex = new RegExp(routeRegex);

                return parsedObject;
            }
        },
        routesPool = {};

    var Router = function (config) {
        this.config = helperMethods.extend(getDefaultConfig(), config || {});
        this.previousRoute = null;
    };

    Router.prototype.registerRoute = function (routes) {
        for (routeFormat in routes) {
            helperMethods.parseRoute(routeFormat, routes[routeFormat]);
        };
    };

    Router.prototype.route = function (routePath, data) {

    }
})(window);