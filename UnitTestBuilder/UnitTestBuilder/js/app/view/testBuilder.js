define(['app/view/templateStore', 'QUnit'], function (templateStore) {
    var getDefaultConfig = function () {
        var config = {
            testBuilderMainTemplate: kendo.template('<div class="TestBuilderContainer"><h2 class="Headers">Unit Test Builder</h2><div class="Field"><span class="Key" title="Project Title">Project Title: </span><span class="ProjectTitleTextbox" placeholder="Enter Project Title" title="Enter Project Title" type="text" data-bind="text:App.Project[0].Name"></span></div><div class="ProjectTreeContainer"><div class="ProjectTree" data-bind="source:App.Project"></div></div><div class="ProjectEditor"></div>'),

            testCaseItemTemplate: kendo.template(''),

            addOrEditProject: kendo.template(''),

            addOrEditCallbackFunction: kendo.template(''),

            addOrEditModule: kendo.template(''),

            addOrEditTest: kendo.template('')
        };

        return config;
    };
    var TestBuilder = kendo.Class.extend({
        init: function ($container, options) {
            this.$container = $container;
            this._config = $.extend(true, getDefaultConfig(), options);
        },
        createProject: function () {
            this.$container.append(this._config.testBuilderMainTemplate({}));
            this.treeViewWidget = this.$container.find('.ProjectTree').kendoTreeView({
                dataTextField: 'Name',
                //template: '<span data-id="#:item.Id#" data-Object="#:item#">#:item.Name#</span>'
            }).getKendoTreeView();
        },
        closeProject: function () {
            this.treeViewWidget.destroy();
            this.$container.empty();
        }
    });

    return TestBuilder;
});