define('APIManagerApp', ['app/model/model', 'app/view/view', 'app/controller/controller', 'app/settingsManager'], function (model, view, controller, settingsManager) {

    // API Manager Application
    var APIManager = function () {

        this.appSettings = new settingsManager();

        // Instantiation of Model, View and Controller
        this.APIManagerView = new view({ APIManager: this, container: document.body });
        this.APIManagerModel = new model({ APIManager: this, moduleDataPath: this.appSettings.getAllModulesPath() });
        this.APIManagerController = new controller({ APIManager: this });
    };

    // Method to start API manager application. Takes no arguments
    APIManager.prototype.start = function () {

        // Reading url string to load previously loaded page
        var urlString = document.URL;
        var mainMenuName = urlString.match(/([?]menu)*?=[^&#]*/g),
            menuName = mainMenuName ? mainMenuName[0].split('=')[1] : this.appSettings.getAppSettings().DefaultMainMenu;

        if (menuName) {
            // This will load main menu item mentioned in url string if mentioned else default menu
            try {
                this.appSettings.setAppSettings(menuName);
                this.APIManagerModel.selectObject(menuName);
                this.APIManagerView.textDescriptor.setDescriptionTextObject(menuName);
            }
            catch (error) {
                console.error(error);
                this.APIManager.APIManagerView.displayMessage('Error occured while selecting main menu. Please check console for more details!!!');
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
            this.APIManagerController.APIManagerEvents[menuName] ? this.APIManagerController.APIManagerEvents[menuName].call(this.APIManagerController, null, urlPath[1], { isPrimaryObjectPathChanged: true }) : console.warn('There is no Event handler defined for this module!!!');    // Here 'null' is passed beacuse method is not called by event handler
        };

        // Remove loading animation
        $('.loaderContainer').remove();
    };

    return APIManager;

});