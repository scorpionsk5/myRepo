define(['app/view/templateStore'], function (templateStore) {
    var getDefaultConfig = function () {
        var config = {
            templates: {
                testBuilderMainTemplate: '<div class="TestBuilderContainer"><h3 class="Headers">Unit Test Builder</h3><div class="ProjectTreeContainer"><div class="ProjectBuilderToolbar"></div><div class="ProjectTree" data-bind="source:App.Project"></div></div><div class="ProjectEditorContainer"><div class="ProjectEditorContent"></div></div></div>',

                projectBuilderToolbarContentTemplate: '<span class="qbIcon addProject" data-action="addNewProject" title="New Project"></span><span class="qbIcon openProject" data-action="openExistingProject" title="Open Existing Project"></span><span class="qbIcon addModule" data-action="addNewModule" title="Add New Module"></span><span class="qbIcon addTest" data-action="addNewTestCase" title="Add New Test Case"></span><span class="qbIcon deleteItem" data-action="deleteItem" title="Delete Selected Item"></span>',

                projectEditorMainContent: '<h3 class="Headers"><span class="Key" title="Project Title">Project Title: </span><span class="Value" title="Project Title" data-bind="text:App.Project[0].Name"></span></div><div class="ProjectEditorContent"></h3>',

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
    },

        templateCache = [];

    var TestBuilder = kendo.Class.extend({
        init: function ($container, options) {
            var me = this;
            me.$container = $container;
            me._config = $.extend(true, getDefaultConfig(), options);
            me.$container.append(me.renderTemplate('testBuilderMainTemplate'));
            me.$container.find('.ProjectBuilderToolbar').append(me.renderTemplate('projectBuilderToolbarContentTemplate'));

            me.treeViewWidget = me.$container.find('.ProjectTree').kendoTreeView({
                dataTextField: 'Name',
                data: [],
                change: $.proxy(me.change, me),
                dataBound: $.proxy(me.dataBound, me),
                drag: $.proxy(me.drag, me),
                drop: $.proxy(me.drop, me),
                dragstart: $.proxy(me.dragstart, me),
                dragend: $.proxy(me.dragend, me),
                select: $.proxy(me.select, me)
            }).getKendoTreeView();

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
        createProject: function () {
            var me = this;
            me.$container.find('.ProjectEditorContainer').append(me.renderTemplate('projectEditorMainContent'));
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
            if (!templateCache[templateName]) {
                if (this._config.templates[templateName]) {
                    templateCache[templateName] = kendo.template(this._config.templates[templateName]);
                }
                else {
                    return '';
                };
            };

            return templateCache[templateName](data);
        },
        destroy: function () {
            this.routeEvent('destroy', { e: e, widget: this });
            this.closeProject();
        }
    });

    return TestBuilder;
});