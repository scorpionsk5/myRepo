define(['app/view/templateStore', 'QUnit'], function (templateStore) {
    var getDefaultConfig = function () {
        var config = {
            templates: {
                testBuilderMainTemplate: kendo.template('<div class="TestBuilderContainer"><h3 class="Headers">Unit Test Builder</h3><div class="ProjectTreeContainer"><div class="ProjectBuilderToolbar"></div><div class="ProjectTree" ></div></div><div class="ProjectEditorContainer"></div>'),

                projectBuilderToolbarContentTemplate: kendo.template(''),

                projectEditorMainContent: kendo.template('<div class="Field"><span class="Key" title="Project Title">Project Title: </span><span class="Value" title="Project Title">#:data.Name#</span></div><div class="ProjectEditorContent" data-project-id="#:data.Id#"></div>'),

                testCaseItemTemplate: kendo.template(''),

                addOrEditProject: kendo.template(''),

                addOrEditCallbackFunction: kendo.template(''),

                addOrEditModule: kendo.template(''),

                addOrEditTest: kendo.template('')
            },
            eventHandlers: {}
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
            this.$container.find('.ProjectBuilderToolbar').on('click', function (e) {
                var dataAction = $(e.target).data('action');
                dataAction && me.routeEvent.call(me, dataAction, e, 'ProjectBuilderToolbar');
            });

            this.$container.find('.ProjectEditorContent').on('click', function (e) {
                var dataAction = $(e.target).data('action');
                dataAction && me.routeEvent.call(me, dataAction, e);
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
            this.$container.find('.ProjectEditorContent').empty();
        },
        refreshTreeViewDataSource: function (data) {
            this.treeViewWidget.setDataSource(new kendo.data.HierarchicalDataSource({ data: data }));
        },
        routeEvent: function (eventName, e, objectName) {
            var eventHandlers = this._config.eventHandlers[objectName] || this._config.eventHandlers;
            if (eventName && eventHandlers[eventName]) {
                e.preventDefault();
                eventHandlers[eventName].call(this, e);
            };
        },
        change: function (e) {
            this.routeEvent('change', e, 'treeView');
        },
        dataBound: function (e) {
            this.routeEvent('dataBound', e, 'treeView');
        },
        drag: function (e) {
            this.routeEvent('drag', e, 'treeView');
        },
        drop: function (e) {
            this.routeEvent('drop', e, 'treeView');
        },
        dragstart: function (e) {
            this.routeEvent('dragStart', e, 'treeView');
        },
        dragend: function (e) {
            this.routeEvent('dragEnd', e, 'treeView');
        },
        select: function (e) {
            this.routeEvent('select', e, 'treeView');
        },
        renderTemplate: function (templateName, data) {
            data = data || {};
            return this._config.templates[templateName] ? this._config.templates[templateName](data) : '';
        }
    });

    return TestBuilder;
});