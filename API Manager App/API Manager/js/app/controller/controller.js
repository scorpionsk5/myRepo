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
    };

    // Method to add click event listener
    controller.prototype.addClickListeners = function (container) {
        var me = this;
        $(container).on('click', function (e) {
            if (e.target.tagName == 'A') {
                try {
                    // Executes if event is triggered by 'anchor' element 
                    var href = $(e.target).attr('href'), urlString = document.URL.split('#');

                    // loadContentPage method is call if 'href' attribute of current target element starts with '#'
                    (href[0] == '#') && me.APIManagerEvents.loadContentPage.call(me, e, href, { isUrlChanged: utils.isUrlChanged(href, urlString[1]) });
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