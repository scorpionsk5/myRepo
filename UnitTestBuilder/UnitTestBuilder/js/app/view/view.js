define(['app/view/testBuilder', 'nicescroll'], function (TestBuilder) {
    var utils = {
        createElement: function (element, properties) {
            var newElement = $('<' + element + '>');
            if (properties) {
                properties.attr && newElement.attr(properties.attr);
                properties.prop && newElement.prop(properties.prop);
                properties.cssClass && newElement.addClass(properties.cssClass);
                properties.style && newElement.css(properties.style);
                properties.text && newElement.text(properties.text);
                properties.data && newElement.data(properties.data);
            };

            return newElement;
        },

        constructMenuItem: function (text, dataAction) {
            return this.createElement('span', { cssClass: 'MenuItem', text: text, data: { action: dataAction } });
        }
    },

        View = kendo.Class.extend({

            init: function ($container) {
                var $mainContainer = utils.createElement('div', { cssClass: 'MainContainer' }),
                    $appContainer = utils.createElement('div', { cssClass: 'AppContainer' });

                $mainContainer.append([utils.createElement('div', { cssClass: 'MainMenu' }), $appContainer]);
                $mainContainer.appendTo($container);

                this.$mainContainer = $mainContainer;
                this.$appContainer = $appContainer;
            },

            render: function (appInstance) {
                this.app = appInstance;
                this.buildMenu();
                var testBuilder = new TestBuilder(this.$appContainer, {});
                //test
                this.app.appModel.createProject('test project');
                testBuilder.createProject();
            },

            buildMenu: function () {
                this.$mainContainer.find('.MainMenu').append([utils.constructMenuItem('Home', 'loadHome'), utils.constructMenuItem('About', 'loadAbout'), utils.constructMenuItem('Help', 'loadHelp')]);
            }
        });

    return View;
});