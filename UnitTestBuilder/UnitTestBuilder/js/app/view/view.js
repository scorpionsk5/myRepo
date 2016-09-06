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

        constructMenuItem: function (text, dataAction, additionalClass) {
            return this.createElement('span', { cssClass: 'MenuItem ' + additionalClass || '', text: text, data: { action: dataAction } });
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
                var me = this;
                me.app = appInstance;
                me.buildMenu();
            },

            buildMenu: function () {
                this.$mainContainer.find('.MainMenu').append([utils.createElement('span', { cssClass: 'QTB-Logo', data: { action: 'home' } }), utils.constructMenuItem('Home', 'home', 'MoreMargin'), utils.constructMenuItem('Project', 'projectBuilder'), utils.constructMenuItem('About', 'about'), utils.constructMenuItem('Help', 'help')]);
            },

            loadTestBuilder: function () {
                var me = this;

                me.testBuilder = new TestBuilder(this.$appContainer, {
                    externalEventManager: function (eventName, args, sectionName) {
                        sectionName = sectionName || 'null';
                        me.app.appController.routeEvent('testBuilderEvent/:' + sectionName + '/:' + eventName, $.extend(true, args, { app: me.app }));
                    }
                });
            },

            clearContent: function () {
                this.$appContainer.testBuilder && this.$appContainer.testBuilder.destroy();
                this.$appContainer.empty();
            }
        });

    return View;
});