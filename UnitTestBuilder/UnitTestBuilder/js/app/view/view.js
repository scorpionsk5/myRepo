define(['app/view/templateStore', 'app/view/codeMirrorLoader', 'nicescroll'], function (templateStore, codeMirrorLoader) {
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
                //me.$appContainer.find('.EditorTable tbody').append(templateStore.renderTemplate('functionBuilder'));

                me.treeViewWidget = me.$appContainer.find('.ProjectTree').kendoTreeView({
                    template: '<span class="TreeItem #:item.Type#"><span class="TreeSprite #:item.Type#"></span>#:item.Name#</span>',
                    change: $.proxy(me._routeTreeWidgetEvent, me, 'change'),
                    dataBound: $.proxy(me._routeTreeWidgetEvent, me, 'dataBound'),
                    drag: $.proxy(me._routeTreeWidgetEvent, me, 'drag'),
                    drop: $.proxy(me._routeTreeWidgetEvent, me, 'drop'),
                    dragstart: $.proxy(me._routeTreeWidgetEvent, me, 'dragstart'),
                    dragend: $.proxy(me._routeTreeWidgetEvent, me, 'dragend'),
                    select: $.proxy(me._routeTreeWidgetEvent, me, 'select')
                }).getKendoTreeView();

                //// Create code mirror instance.
                //codeMirrorLoader(me.$appContainer.find('.CodeEditor')[0], {
                //    theme: 'neo',
                //    onloadComplete: function () {
                //        var $codeMirror = me.$appContainer.find('.CodeMirror'),
                //            $codeConatiner = $codeMirror.find('.CodeMirror-sizer');
                //        $codeMirror.find('.CodeMirror-vscrollbar').niceScroll({
                //            cursorcolor: '#00b1ff'
                //        });

                //        $codeConatiner.append([utils.createElement('span', { cssClass: 'Header' }), utils.createElement('span', { cssClass: 'Footer' })]);
                //    }
                //});

                me.treeViewWidget.element.niceScroll({
                    cursorcolor: '#00b1ff'
                });

                me.initEventListeners();
            },

            initEventListeners: function () {
                var me = this;

                me.$appContainer.find('.ProjectBuilderToolbar').on('click', function (e) {
                    var dataAction = $(e.target).data('action');
                    dataAction && me.routeEvent(dataAction, { e: e, forceRepeat: true }, 'testBuilderEvent/:projectBuilderToolbar');
                    me.$appContainer.find('.ProjectEditorContent input[type=text]').eq(0).focus();
                });

                me.$appContainer.find('.ProjectEditorContent').on('click', function (e) {
                    var dataAction = $(e.target).data('action');
                    dataAction && me.routeEvent(dataAction, { e: e, forceRepeat: true }, 'testBuilderEvent/:editor');
                });
            },

            _routeTreeWidgetEvent: function (eventName, e) {
                var me = this;
                me.routeEvent(eventName, { e: e, forceRepeat: true }, 'testBuilderEvent/:projectTree');
            },

            routeEvent: function (eventName, args, sectionName) {
                var me = this;
                me.app.appController.routeEvent(sectionName + '/:' + eventName, $.extend(true, args, { app: me.app, treeViewWidget: me.treeViewWidget }));
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
                    close: function (e) {
                        $windowWidget.off('click');
                        me.routeEvent('close', { e: e }, 'windowEvents');
                        this.destroy();
                    },
                    modal: true,
                    activate: function (e) {
                        this.element.find('input[type=text]').eq(0).focus();
                    }
                }, config || {});

                windowWidget = $windowWidget.kendoWindow(config).getKendoWindow();
                windowWidget.open().center();
                $windowWidget.on('click', function (e) {
                    var dataAction = $(e.target).data('action');
                    dataAction && me.routeEvent(dataAction, { e: e, widget: windowWidget }, 'windowEvents');
                });

                return windowWidget;
            },

            setHeaderAndFooterForCodeMirror: function (argumentList) {
                argumentList = argumentList || [];
                var headerText = 'function(' + argumentList.join(",") + ') {',
                    footerText = '}',
                    $codeConatiner = this.$appContainer.find('.CodeMirror .CodeMirror-sizer');

                $codeConatiner.find('.Header').text(headerText);
                $codeConatiner.find('.Footer').text(footerText);
            }
        });

    return View;
});