define(['text!../../../appSettings/appSettings.json', 'jquery'], function (settings, $) {
    var currentSettings = {},

        // Method to read JSON settings file and returns settings object
        readSettings = function () {
            var parsedSettingsData = JSON.parse(settings), settingsData = {};

            $.each(parsedSettingsData, function (moduleName, moduleSettings) {
                if (moduleName[0] != '_') {
                    settingsData[moduleName] = $.extend(true, {}, parsedSettingsData._CommonAppSettings, moduleSettings || {});
                }
                else {
                    settingsData[parsedSettingsData._CommonAppSettings.DefaultMainMenu] = $.extend(true, {}, parsedSettingsData._CommonAppSettings, moduleSettings || {});
                };
            });

            parsedSettingsData._CommonAppSettings.DefaultMainMenu && (currentSettings = settingsData[parsedSettingsData._CommonAppSettings.DefaultMainMenu]);

            // Return a function which returns settings object of key argument
            return function (key) {
                currentSettings = settingsData[key];
            };
        };

    // Class to manage app settings
    var settingsManager = function () {
        this.setAppSettings = readSettings.call(this);
    };

    // Method to get current App settings object
    settingsManager.prototype.getAppSettings = function () {
        return currentSettings || {};
    };

    return settingsManager;
});