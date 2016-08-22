define(function () {
    var utils = {
        createElement: function (element, properties) {
            var newElement = $('<' + element + '>');
            if (properties) {
                properties.attr && newElement.attr(properties.attr);
                properties.prop && newElement.prop(properties.prop);
                properties.cssClass && newElement.addClass(properties.cssClass);
                properties.style && newElement.css(properties.style);
                properties.text && newElement.text(properties.text);
            };

            return newElement;
        }
    },

        View = kendo.Class.extend({
            init: function ($container) {
                this.$container = $container;
                var $mainContainer = utils.createElement('div', { cssClass: 'MainContainer' }),
                    $sidebarMenu = utils.createElement('aside', { cssClass: 'SidebarMenu' }),
                    $caseBuilderContainer = utils.createElement('div', { cssClass: 'CaseBuilderContainer' });

                $mainContainer.append([utils.createElement('h2', { text: 'Test Builder', cssClass: 'Headers' }), $sidebarMenu, $caseBuilderContainer]);
                $mainContainer.appendTo(this.$container);
            },

            postInit: function (appInstance) {
                this.app = appInstance;
                this.addCase();
            },

            addCase: function () {

            },

            _buildCaseView: function () {
                var $caseView = utils.createElement('div', { cssClass: 'CaseView' });
            }
        });

    return View;
});