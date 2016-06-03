define(['jquery', 'app/controller/events'], function ($, events) {

    // Utility object, where miscellaneous methods are written, these methods are used by Controller
    var utils = {
        // Method to compare url of current page and href and returns boolean value
        isUrlChanged: function (href, urlstring) {
            var hrefArray = [], urlstringArray = [];

            // Returns 'true' if urlString is undefined or doesn't matches with href
            if (!urlstring) return true;
            href = href.slice(1, href.length);
            hrefArray = href.split('.');
            urlstringArray = urlstring.split('.');
            for (var i = 0; i < 2; i++) {
                if (hrefArray[i] != urlstringArray[i]) {
                    return true;
                };
            };

            return false;
        }
    };

    // Controller class
    var controller = function (Args) {
        this.APIManager = Args.APIManager;
        this.APIManagerEvents = events;

        // Add click event listener on body which route to corresponding event handler
        this.addClickListeners(this.APIManager.APIManagerView.$container);
    };

    // Method to add click event listener
    controller.prototype.addClickListeners = function (container) {
        var me = this;
        $(container).on('click', function (e) {
            if (e.target.tagName == 'A') {
                try {
                    var mainMenuName = document.URL.match(/([?]menu)*?=[^&#]*/g),
                        menuName = mainMenuName ? mainMenuName[0].split('=')[1] : me.APIManager.appSettings.getAppSettings().DefaultMainMenu;

                    // Executes if event is triggered by 'anchor' element 
                    var href = $(e.target).attr('href'), urlString = document.URL.split('#');

                    // loadContentPage method is call if 'href' attribute of current target element starts with '#'
                    if (href[0] === '#') {
                        me.APIManagerEvents[menuName] ? me.APIManagerEvents[menuName].call(me, e, href, { isUrlChanged: utils.isUrlChanged(href, urlString[1]) }) : console.warn('There is no Event handler defined for this module!!!');
                    };
                }
                catch (error) {
                    console.log(error);
                    me.APIManager.APIManagerView.displayMessage('Error occured while loading content. Please check console for more details!!!');
                };
            };
        });
    };

    return controller;
});