// Module and css loader for code mirror using requireJs.
define(['lib/codemirror/lib/codemirror'], function (CodeMirror) {
    var baseUrl = requirejs.s.contexts._.config.baseUrl + 'lib/codemirror/',

        deferred = function () {
            var callbackPool = {
                done: null,
                fail: null
            };

            return {
                promise: function () {
                    return {
                        done: function (callback) {
                            callbackPool.done = callback;
                            return this;
                        },
                        fail: function (callback) {
                            callbackPool.fail = callback;
                            return this;
                        }
                    }
                },
                resolve: function (args) {
                    callbackPool.done && callbackPool.done(args);
                },
                reject: function (args) {
                    callbackPool.fail && callbackPool.fail(args);
                }
            }
        },

        // Method to copy contents of all object to first object.
        extend = function () {
            var newObject = {};
            for (var idx in arguments) {
                for (var objName in arguments[idx]) {
                    newObject[objName] = arguments[idx][objName];
                };
            };

            return newObject;
        },

        getDefaultConfig = function () {
            return {
                lineNumbers: true,
                lineWrapping: true,
                extraKeys: { "Ctrl-Space": "autocomplete" },
                mode: 'javascript',
                addon: ['hint/show-hint', 'hint/javascript-hint'],   // Addons to be loaded, it's array of relativepath with in addon folder as string.
            };
        },

        linkCSS = function (relativePath) {
            var linkElement = window.document.createElement('link');
            linkElement.href = baseUrl + relativePath;
            linkElement.rel = 'stylesheet';
            window.document.head.appendChild(linkElement);
        },

        loadModules = function (modulesPath) {
            var def = deferred();
            require(modulesPath, function () {
                def.resolve(arguments);
            },
            function (err) {
                def.reject(err);
            });
            return def.promise();
        },

        loadBaseFiles = function () {
            linkCSS('lib/codemirror.css');
            linkCSS('addon/hint/show-hint.css');
        },

        loadRequiredFiles = function (config) {
            var moduleList = [], relativeBasePath = 'lib/codemirror/', modePath = relativeBasePath + 'mode/', addonPath = relativeBasePath + 'addon/', themePath = 'theme/', keymapPath = relativeBasePath + 'keymap/';

            // Load mode.
            config.mode && moduleList.push(modePath + config.mode + '/' + config.mode);

            // Load addons.
            if (config.addon.length) {
                for (var idx in config.addon) {
                    moduleList.push(addonPath + config.addon[idx]);
                }
            };

            // Load keymap.
            config.keymap && moduleList.push(keymapPath + config.keymap);

            // Load theme css.
            config.theme && linkCSS(themePath + config.theme + '.css');

            return loadModules(moduleList);
        }

    CMLoader = function (element, config) {
        config = extend(getDefaultConfig(), config || {}, { value: element.value });
        loadBaseFiles();
        loadRequiredFiles(config).done(function () {
            CodeMirror.fromTextArea(element, config);
            config.onloadComplete && config.onloadComplete();
        });
    };

    return CMLoader;
});