define(['underscore'], function (_) {

    // Utility object, where miscellaneous methods are written, these methods are used by event handlers
    var utils = {
        // Method to parse url link and breaks down int primary link and secondary link
        parseObjectLink: function (link) {
            var linkArray = link.split('.'),
                primaryLink = [],   // PrimaryLink holds the object path of the content to be loaded
                secondaryLink = []; // SecondaryLink holds the property name to where scroll is to be adjusted

            (linkArray[0].charAt(0) == '#') && (linkArray[0] = linkArray[0].slice(1, linkArray[0].length));
            primaryLink.push(linkArray[0]);
            if (linkArray.length > 1) {
                primaryLink.push(linkArray[1]);
                if (linkArray.length > 2) {
                    for (var i = 2; i < linkArray.length; i++) {
                        secondaryLink.push(linkArray[i]);
                    }
                    secondaryLink = secondaryLink.join('.');
                }
            };

            primaryLink = primaryLink.join('.');

            return { primaryLink: primaryLink, secondaryLink: secondaryLink, scrollToProperty: linkArray[linkArray.length - 1] }
        }
    };

    // Object where all event Handlers are defined
    var eventHandlers = {

        // Method to load required content on page
        loadContentPage: function (e, contentPath, options) {
            var APIManager = this.APIManager || this, parsedLink = {};
            this.e = e;

            // Parse contentpath and pass it to loadMainContent method
            parsedLink = utils.parseObjectLink.call(this, contentPath);
            // Call loadMainContent method only if url is changed
            (options) && (options.isUrlChanged) && APIManager.APIManagerView.loadMainContent(_.extend({}, { APIManager: APIManager, e: this.e }, parsedLink));

            // Adjust scroll after loading content
            APIManager.APIManagerView.adjustScroll(parsedLink.scrollToProperty);

            // Set attribute for anchors in content page to redirect url with new tab
            this.APIManager.APIManagerView.mainContainer.find('a[href^=http]')
                .attr('target', '_blank')
                .addClass('externalLink');
        }
    };

    return eventHandlers;
});