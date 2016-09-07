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

                //me.app.testBuilder = new TestBuilder(this.$appContainer, {
                //    externalEventManager: function (eventName, args, sectionName) {
                //        sectionName = sectionName || 'null';
                //        me.app.appController.routeEvent('testBuilderEvent/:' + sectionName + '/:' + eventName, $.extend(true, args, { app: me.app }));

                //        (eventName !== 'dataBound') && me.app.appController.routeEvent('bind', { app: me.app });
                //    }
                //});

                //TODO: add preloads for templates.
                me.$appContainer.append(me.renderTemplate('testBuilderMainTemplate'));
                me.$appContainer.find('.ProjectBuilderToolbar').append(me.renderTemplate('projectBuilderToolbarContentTemplate'));

                me.treeViewWidget = me.$appContainer.find('.ProjectTree').kendoTreeView({
                    dataTextField: 'Name',
                    change: $.proxy(me.change, me, 'change'),
                    dataBound: $.proxy(me.dataBound, me, 'dataBound'),
                    drag: $.proxy(me.drag, me, 'drag'),
                    drop: $.proxy(me.drop, me, 'drop'),
                    dragstart: $.proxy(me.dragstart, me, 'dragstart'),
                    dragend: $.proxy(me.dragend, me, 'dragent'),
                    select: $.proxy(me.select, me, 'select')
                }).getKendoTreeView();

                me.initEventListeners();
            },

            initEventListeners: function () {
                var me = this;
                this.$container.find('.ProjectBuilderToolbar').on('click', function (e) {
                    var dataAction = $(e.target).data('action');
                    dataAction && me.routeEvent(dataAction, { e: e}, 'projectBuilderToolbar');
                });

                this.$container.find('.ProjectEditorContent').on('click', function (e) {
                    var dataAction = $(e.target).data('action');
                    dataAction && me.routeEvent(dataAction, { e: e }, 'editor');
                });
            },

            _routeTreeWidgetEvent: function (eventName, e) {
                var me = this;
                me.routeEvent('testBuilderEvent/:projectTree/:' + eventName, $.extend(true, args, { app: me.app }));
            },

            routeEvent: function (eventName, args, sectionName) {
                var me = this;
                me.app.appController.routeEvent('testBuilderEvent/:' + sectionName + '/:' + eventName, $.extend(true, args, { app: me.app }));
                (eventName !== 'dataBound') && me.app.appController.routeEvent('bind', { app: me.app });    //TODO: change to rebind on editor.
            },

            clearContent: function () {
                this.app.testBuilder && this.app.testBuilder.destroy();
                this.$appContainer.empty();
            }
        });

    return View;
});