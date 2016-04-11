define(['jquery', 'kendo', 'underscore', 'app/view/templateStore', 'text!../../../data/descriptionText.json', 'nicescroll'], function ($, kendo, _, templateStoreClass, descriptionText) {

    var currentDescriptionTextObject = {},

        // This method returns a method that will fetch corresponding customKeywordText or description text
        loadDescriptionText = function () {
            var parsedDescriptionTextObject = JSON.parse(descriptionText), descriptionTextObject = {};

            $.each(parsedDescriptionTextObject, function (moduleName, descriptionObject) {
                if (moduleName[0] != '_') {
                    descriptionTextObject[moduleName] = $.extend(true, {}, parsedDescriptionTextObject._CommonConfigurations, descriptionObject || {});
                };
            });

            return function (key) {
                currentDescriptionTextObject = descriptionTextObject[key];
            };
        };

    // View Class
    var view = function (Args) {
        this.$container = $(Args.container);
        this.APIManager = Args.APIManager;
        this.setDescriptionText = loadDescriptionText();
        this.initializePage();

        try {
            // Create Instance of templateStoreClass
            this.templateStore = new templateStoreClass();
        }
        catch (err) {
            console.log(err);
            this.APIManager.APIManagerView.displayMessage('Error occured while registering templates. Please check console for more details!!!');
        };
    };

    // Method to initialize page by create required containers and widgetize them
    view.prototype.initializePage = function () {

        var scrollBarColor = 'rgb(196, 196, 196)', messageWindow = $('<div>').addClass('messageWindow');

        // Main Header element
        $('<h1>').addClass('mainHeader').text(this.APIManager.getAppSettings().AppHeader || "API").appendTo($('<div>').addClass('headerContainer').appendTo(this.$container));

        this.mainMenuElement = $('<div>').addClass('mainMenuElement').appendTo(this.$container);

        // Container element which will be widgetized to kendoSplitter
        var $spliterPanel = $('<div>')
            .addClass('spliterPanel')
            .appendTo(this.$container);

        // Menu element and container for displaying contents
        this.menuElement = $('<div>').addClass('menuElement').appendTo($spliterPanel);
        this.mainContainer = $('<div>').addClass('mainContainer').appendTo($spliterPanel);

        // Create kendoSplitter widget
        $spliterPanel.kendoSplitter({
            orientation: "horizontal",
            panes: [
            { collapsible: false, resizable: false, size: "20%" },
            { collapsible: false, resizable: false }
            ]
        });

        // Creating custom scroll on menu container
        this.menuElement.niceScroll({
            bouncescroll: true,
            cursorcolor: scrollBarColor,
            autohidemode: false,
            grabcursorenabled: false
        });

        // Creating custom scroll on display container
        this.mainContainer.niceScroll({
            bouncescroll: true,
            cursorcolor: scrollBarColor,
            autohidemode: false,
            grabcursorenabled: false,
        });

        // Creating popup window to display messages
        messageWindow.kendoWindow({
            actions: ["Close"],
            modal: true,
            resizable: false,
            width: 500,
            height: 150
        });

        // Storing the instance of the message window 
        this.messageWindow = messageWindow.data('kendoWindow');
    };

    // Method to create sub menu
    view.prototype.createSubMenu = function (menuData) {

        if (menuData) {
            var options = {
                animation: {
                    collapse: {
                        duration: 100,
                        effects: "collapseVertical"
                    },
                    expand: {
                        duration: 100,
                        effects: "expandVertical"
                    }
                },
                dataSource: menuData
            };

            // Creating widget to display menu based on appSettings
            switch (this.APIManager.getAppSettings().MenuType) {
                case 'kendoPanelBar': this.menuElement.kendoPanelBar(options);
                    break;
                case 'kendoMenu': this.menuElement.kendoMenu(options);
                    break;
                default: this.menuElement.kendoTreeView(options);
                    break;
            };
        };
    };

    // Method to create Main menu
    view.prototype.createMainMenu = function (menuData) {

        var options = {
            animation: {
                collapse: {
                    duration: 100,
                    effects: "collapseVertical"
                },
                expand: {
                    duration: 100,
                    effects: "expandVertical"
                }
            },
            dataSource: menuData
        };

        this.mainMenuElement.kendoMenu(options);
    };

    // Method to load data in main content
    view.prototype.loadMainContent = function (Args) {

        var dataObject = this.APIManager.APIManagerModel.getSelectedDataObject(), compiledTemplate = '';

        // Get required Object by passing data object and path as a arguments 
        Args.dataObject = this.APIManager.APIManagerModel.getObjectByPath(dataObject, Args.primaryLink);

        try {
            // Load template with Args object all information regarding displaying data on page and store the compiled template in compiledTemplate variable
            Args.dataObject && this.templateStore.TemplateCache['templates/mainContent'] && (compiledTemplate = this.templateStore.TemplateCache['templates/mainContent'].call(this, Args));
        }
        catch (err) {
            console.log(err);
            this.displayMessage('Error occured while loading template. Please check console for more details!!!');
        };

        // If template is complied successfully then load the template in container
        if (compiledTemplate) {
            this.mainContainer.html('');
            this.mainContainer.html(compiledTemplate);
        };
    };

    // Method to Adjust scroll to display the required property  
    view.prototype.adjustScroll = function (dataName) {

        var scrollTop, scrollItem;

        // Finding header element which contains required data-name attribute
        scrollItem = this.$container.find('h3[data-name=' + dataName + ']');

        // Set scroll to top most position
        this.mainContainer.scrollTop({ top: 0 });

        // Calculate top position of required header element
        scrollTop = scrollItem.length ? scrollItem.position().top : 0;

        // Set top scroll position to scroll to the required position
        this.mainContainer.scrollTop(scrollTop);
    };

    // Method to display alert message on popup window
    view.prototype.displayMessage = function (message, title) {
        this.messageWindow.content(message);    // Load content text or HTML
        this.messageWindow.setOptions({     // Set title to message window
            title: title || 'Atert!!!'
        });
        this.messageWindow.open().center();  // Open message window and set position to center 
    };

    // This method returns corresponding customKeywordText or description text
    view.prototype.getDescriptionText = function (key) {
        return currentDescriptionTextObject[key] || key;
    };

    return view;
});