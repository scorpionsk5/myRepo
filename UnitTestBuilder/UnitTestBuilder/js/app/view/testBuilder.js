define(['app/view/templateStore', 'QUnit'], function (templateStore) {
    var getDefaultConfig = function () {
        var config = {
            testBuilderMainTemplate: kendo.template('<div class="TestBuilderContainer" data-project-id="#=data.projectId#"><h2 class="Headers">Unit Test Builder</h2><div class="Field"><span class="Key" title="Project Title">Project Title: </span><span class="k-textbox ProjectTitleTextbox" placeholder="Enter Project Title" title="Enter Project Title" type="text" data-bind="text:ViewModel.ProjectTitle"></span></div><div class="TestCaseContainer"></div></div>'),

            testCaseItemTemplate: kendo.template(''),

            addOrEditProject: kendo.template(''),

            addOrEditCallbackFunction: kendo.template(''),

            addOrEditModule: kendo.template(''),

            addOrEditTest: kendo.template(''),

        };

        return config;
    };
    var TestBuilder = kendo.Class.extend({
        init: function ($container, options) {

        }
    });

    return TestBuilder;
});