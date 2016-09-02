define(['app/view/templateStore', 'QUnit'], function (templateStore) {
    var getDefaultConfig = function () {
        var config = {
            testBuilderMainTemplate: '<div class="TestBuilderContainer" data-project-id="#=data.projectId#"><h2 class="Headers">Unit Test Builder</h2><div class="Field"><span class="Key" title="Project Title">Project Title: </span><input class="k-textbox ProjectTitleTextbox" placeholder="Enter Project Title" title="Enter Project Title" type="text" data-bind="value:ViewModel.ProjectTitle" /></div><div class="TestCaseContainer"></div></div>',

            testCaseItemTemplate: ''
        };

        return config;
    };
    var TestBuilder = kendo.Class.extend({
        init: function ($container, options) {
            
        }
    });

    return TestBuilder;
});