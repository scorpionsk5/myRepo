define(['app/view/templateStore', 'nicescroll'], function (templateStore) {
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
                var me = this;
                me.$mainContainer.find('.MainMenu').append([utils.createElement('span', { cssClass: 'QTB-Logo', data: { action: 'home' } }), utils.constructMenuItem('Home', 'home', 'MoreMargin'), utils.constructMenuItem('Project', 'projectBuilder'), utils.constructMenuItem('About', 'about'), utils.constructMenuItem('Help', 'help')]);

                me.$mainContainer.find('.MainMenu').on('click', function (e) {
                    var dataAction = $(e.target).data('action');
                    dataAction && me.routeEvent(dataAction, { e: e }, 'loadPage');
                });
            },

            loadTestBuilder: function () {
                var me = this;

                me.$appContainer.append(templateStore.renderTemplate('testBuilderMainTemplate'));
                me.$appContainer.find('.ProjectBuilderToolbar').append(templateStore.renderTemplate('projectBuilderToolbarContentTemplate'));

                me.treeViewWidget = me.$appContainer.find('.ProjectTree').kendoTreeView({
                    dataTextField: 'Name',
                    change: $.proxy(me._routeTreeWidgetEvent, me, 'change'),
                    dataBound: $.proxy(me._routeTreeWidgetEvent, me, 'dataBound'),
                    drag: $.proxy(me._routeTreeWidgetEvent, me, 'drag'),
                    drop: $.proxy(me._routeTreeWidgetEvent, me, 'drop'),
                    dragstart: $.proxy(me._routeTreeWidgetEvent, me, 'dragstart'),
                    dragend: $.proxy(me._routeTreeWidgetEvent, me, 'dragent'),
                    select: $.proxy(me._routeTreeWidgetEvent, me, 'select')
                }).getKendoTreeView();

                me.initEventListeners();
            },

            initEventListeners: function () {
                var me = this;

                me.$appContainer.find('.ProjectBuilderToolbar').on('click', function (e) {
                    var dataAction = $(e.target).data('action');
                    dataAction && me.routeEvent(dataAction, { e: e }, 'testBuilderEvent/:projectBuilderToolbar');
                });

                me.$appContainer.find('.ProjectEditorContent').on('click', function (e) {
                    var dataAction = $(e.target).data('action');
                    dataAction && me.routeEvent(dataAction, { e: e }, 'testBuilderEvent/:editor');
                });
            },

            _routeTreeWidgetEvent: function (eventName, e) {
                var me = this;
                me.routeEvent('testBuilderEvent/:projectTree/:' + eventName, { e: e, app: me.app });
            },

            routeEvent: function (eventName, args, sectionName) {
                var me = this;
                me.app.appController.routeEvent(sectionName + '/:' + eventName, $.extend(true, args, { app: me.app }));

                //(eventName !== 'dataBound') && me.app.appController.routeEvent('bind', { app: me.app });    //TODO: change to rebind on editor.
            },

            clearContent: function () {
                this.app.testBuilder && this.app.testBuilder.destroy();
                this.$appContainer.empty();
            },

            loadWindow: function (content, title, config) {
                var me = this, $windowWidget = utils.createElement('div', { cssClass: 'WindowWidget' }), windowWidget = null, config = $.extend(true, {
                    title: title || 'Confirmation Window',
                    content: {
                        template: content
                    },
                    close: function () {
                        $windowWidget.off('click');
                        this.destroy();
                    },
                    model: true
                }, config || {});

                windowWidget = $windowWidget.kendoWindow(config).getKendoWindow();
                windowWidget.open().center();
                $windowWidget.on('click', function (e) {
                    var dataAction = $(e.target).data('action');
                    dataAction && me.routeEvent(dataAction, { e: e, widget: windowWidget }, 'windowEvents');
                });
            }
        });

    return View;
});