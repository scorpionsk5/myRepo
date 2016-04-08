define(['app/model/model', 'app/view/view', 'app/controller/controller', 'text!../../../appSettings/appSettings.json', 'jquery'], function (model, view, controller, settings, $) {

    // Method to read JSON settings file and returns settings object
    var readSettings = function () {
        var settingData = JSON.parse(settings);
        return settingData;
    };

    // API Manager Application
    var APIManager = function () {

        this.appSettings = readSettings.call(this);

        // Instantiation of Model, View and Controller
        this.APIManagerView = new view({ APIManager: this, container: document.body });
        this.APIManagerModel = new model({ APIManager: this });
        this.APIManagerController = new controller({ APIManager: this });
    };

    APIManager.prototype.start = function () {

        // Reading url string to load previously loaded page
        var urlString = document.URL;
        var mainMenuName = urlString.match(/([?]menu)*?=[^&#]*/g);

        // This will load main menu as mentioned in url string
        try {
            if (mainMenuName) {
                var menuName = mainMenuName[0].split('=')[1];
                this.APIManagerModel.selectObject(menuName);
                this.APIManagerView.setDescriptionText(menuName);
            }
            else {
                this.APIManagerModel.selectObject(this.appSettings.DefaultMainMenu);
                this.APIManagerView.setDescriptionText(this.appSettings.DefaultMainMenu);
            }
        }
        catch (error) {
            console.log(error);
            this.APIManager.APIManagerView.displayMessage('Error in selecting main menu. Please check console for more details!!!');
        };

        // Generate main menu
        var mainMenuData = this.APIManagerModel.generateMainMenuList();

        this.APIManagerView.createMainMenu(mainMenuData);

        // Generate menu list by excluding unwanted properties data object
        var menuData = this.APIManagerModel.generateSubMenuList();

        // Create menu from ganerated menu list 
        this.APIManagerView.createSubMenu(menuData);

        // Add click event listener on body which route to corresponding event handler
        this.APIManagerController.addClickListeners(document.body);

        // This will load data when page is refreshed and also object path is mentioned in url
        if (urlString.indexOf('#') > -1) {
            urlPath = urlString.split('#'); // Splitting url string by '#' and passing string after # tag as argument to loadContentPage method
            this.APIManagerController.APIManagerEvents.loadContentPage.call(this.APIManagerController, null, urlPath[1], { isUrlChanged: true });    // Here 'null' is passed beacuse method is not called by event handler
        };
    };

    return APIManager;

});