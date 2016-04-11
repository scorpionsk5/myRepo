define(['app/model/model', 'app/view/view', 'app/controller/controller', 'text!../../../appSettings/appSettings.json', 'jquery'], function (model, view, controller, settings, $) {

    var currentSettings = {},

    // Method to read JSON settings file and returns settings object
        readSettings = function () {
            var parsedSettingsData = JSON.parse(settings), settingsData = {};

            $.each(parsedSettingsData, function (moduleName, settingsObject) {
                if (moduleName[0] != '_') {
                    settingsData[moduleName] = $.extend(true, {}, parsedSettingsData._CommonAppSettings, settingsObject || {});
                }
                else {
                    settingsData[parsedSettingsData._CommonAppSettings.DefaultMainMenu] = $.extend(true, {}, parsedSettingsData._CommonAppSettings, settingsObject || {});
                };
            });

            parsedSettingsData._CommonAppSettings.DefaultMainMenu && (currentSettings = settingsData[parsedSettingsData._CommonAppSettings.DefaultMainMenu]);

            return function (key) {
                currentSettings = settingsData[key];
            };
        };

    // API Manager Application
    var APIManager = function () {

        this.setAppSettings = readSettings.call(this);

        // Instantiation of Model, View and Controller
        this.APIManagerView = new view({ APIManager: this, container: document.body });
        this.APIManagerModel = new model({ APIManager: this });
        this.APIManagerController = new controller({ APIManager: this });
    };

    APIManager.prototype.start = function () {

        // Reading url string to load previously loaded page
        var urlString = document.URL;
        var mainMenuName = urlString.match(/([?]menu)*?=[^&#]*/g),
            menuName = mainMenuName ? mainMenuName[0].split('=')[1] : this.getAppSettings().DefaultMainMenu;

        if (menuName) {
            // This will load main menu as mentioned in url string
            try {
                this.setAppSettings(menuName);
                this.APIManagerModel.selectObject(menuName);
                this.APIManagerView.setDescriptionText(menuName);
            }
            catch (error) {
                console.log(error);
                this.APIManager.APIManagerView.displayMessage('Error in selecting main menu. Please check console for more details!!!');
            };
        };

        // Generate main menu items
        var mainMenuData = this.APIManagerModel.generateMainMenuList();

        // Create main menu
        this.APIManagerView.createMainMenu(mainMenuData);

        // Generate menu list by excluding unwanted properties data object
        var menuData = this.APIManagerModel.generateSubMenuList();

        // Create menu from ganerated menu list 
        this.APIManagerView.createSubMenu(menuData);

        // This will load data when page is refreshed and also object path is mentioned in url
        if (urlString.indexOf('#') > -1) {
            urlPath = urlString.split('#'); // Splitting url string by '#' and passing string after # tag as argument to loadContentPage method
            this.APIManagerController.APIManagerEvents.loadContentPage.call(this.APIManagerController, null, urlPath[1], { isUrlChanged: true });    // Here 'null' is passed beacuse method is not called by event handler
        };

        // Remove loading animation
        $('.loaderContainer').remove();
    };

    APIManager.prototype.getAppSettings = function () {
        return currentSettings || {};
    };

    return APIManager;

});