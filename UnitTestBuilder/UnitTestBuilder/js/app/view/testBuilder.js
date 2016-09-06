define(['app/view/templateStore'], function (templateStore) {
    var getDefaultConfig = function () {
        var config = {
            templates: {
                testBuilderMainTemplate: '<div class="TestBuilderContainer"><h3 class="Headers">Unit Test Builder</h3><div class="ProjectTreeContainer"><div class="ProjectBuilderToolbar"></div><div class="ProjectTree" ></div></div><div class="ProjectEditorContainer"></div>',

                projectBuilderToolbarContentTemplate: '',

                projectEditorMainContent: '<div class="Field"><span class="Key" title="Project Title">Project Title: </span><span class="Value" title="Project Title">#:data.Name#</span></div><div class="ProjectEditorContent" data-project-id="#:data.Id#"></div>',

                testCaseItemTemplate: '',

                addOrEditProject: '',

                addOrEditCallbackFunction: '',

                addOrEditModule: '',

                addOrEditTest: ''
            },
            eventHandlers: {
                projectBuilderToolbar: {

                },
                treeView: {

                },
                editor: {

                }
            },
            externalEventManager: null
        };

        return config;
    };
    var TestBuilder = kendo.Class.extend({
        init: function ($container, options) {
            var me = this;
            me.$container = $container;
            me._config = $.extend(true, getDefaultConfig(), options);
            me.$container.append(me.renderTemplate('testBuilderMainTemplate'));
            me.initEventListeners();
        },
        initEventListeners: function () {
            var me = this;
            this.$container.find('.ProjectBuilderToolbar').on('click', function (e) {
                var dataAction = $(e.target).data('action');
                dataAction && me.routeEvent.call(me, dataAction, { e: e }, 'projectBuilderToolbar');
            });

            this.$container.find('.ProjectEditorContent').on('click', function (e) {
                var dataAction = $(e.target).data('action');
                dataAction && me.routeEvent.call(me, dataAction, { e: e, widget: me }, 'editor');
            });
        },
        createProject: function (data) {
            var me = this;
            me.treeViewWidget = me.$container.find('.ProjectTree').kendoTreeView({
                dataTextField: 'Name',
                dataSource: data,
                change: $.proxy(me.change, me),
                dataBound: $.proxy(me.dataBound, me),
                drag: $.proxy(me.drag, me),
                drop: $.proxy(me.drop, me),
                dragstart: $.proxy(me.dragstart, me),
                dragend: $.proxy(me.dragend, me),
                select: $.proxy(me.select, me)
            }).getKendoTreeView();

            me.$container.find('.ProjectEditorContainer').append(me.renderTemplate('projectEditorMainContent', data[0]));
        },
        closeProject: function () {
            this.treeViewWidget.destroy();
            this.$container.find('.ProjectEditorContainer').empty();
        },
        refreshTreeViewDataSource: function (data) {
            this.treeViewWidget.setDataSource(new kendo.data.HierarchicalDataSource({ data: data }));
        },
        routeEvent: function (eventName, args, objectName) {

            if (this._config.externalEventManager) {
                args.e.preventDefault();
                this._config.externalEventManager.apply(this, arguments);
                return;
            }

            var eventHandlers = this._config.eventHandlers[objectName] || this._config.eventHandlers;
            if (eventName && eventHandlers[eventName]) {
                args.e.preventDefault();
                eventHandlers[eventName].call(this, args);
            };
        },
        change: function (e) {
            this.routeEvent('change', { e: e, widget: this }, 'treeView');
        },
        dataBound: function (e) {
            this.routeEvent('dataBound', { e: e, widget: this }, 'treeView');
        },
        drag: function (e) {
            this.routeEvent('drag', { e: e, widget: this }, 'treeView');
        },
        drop: function (e) {
            this.routeEvent('drop', { e: e, widget: this }, 'treeView');
        },
        dragstart: function (e) {
            this.routeEvent('dragStart', { e: e, widget: this }, 'treeView');
        },
        dragend: function (e) {
            this.routeEvent('dragEnd', { e: e, widget: this }, 'treeView');
        },
        select: function (e) {
            this.routeEvent('select', { e: e, widget: this }, 'treeView');
        },
        renderTemplate: function (templateName, data) {
            data = data || {};
            return this._config.templates[templateName] ? kendo.template(this._config.templates[templateName])(data) : '';
        },
        destroy: function () {
            this.routeEvent('destroy', { e: e, widget: this });
            this.closeProject();
        }
    });

    return TestBuilder;
});