define(['app/utils', 'app/model/dataModels/testCase', 'app/model/dataModels/module', 'app/model/dataModels/callbacks', 'app/model/Enums', 'app/model/dataModels/project'], function (utils, TestCase, Module, Callback, Enums, Project) {

    var Model = kendo.Class.extend({
        init: function () {
            this.viewModel = kendo.observable({
                App: {
                    Project: [],
                    Enums: Enums
                }
            });
        },

        load: function (appInstance) {
            this.app = appInstance;
            kendo.bind(this.app.appView.$appContainer, this.viewModel);
        },

        createProject: function (ProjectName) {
            this.viewModel.App.Project.push(new Project(ProjectName));
        },

        loadExisitingProject: function (projectData) {
            this.viewModel.App.set('Project', projectData);
        },

        createModule: function (moduleName) {
            return new Module(moduleName);
        },

        createModuleLevelCallback: function (name, callbackName) {
            return new Callback(name, callbackName, 'ModuleLevelCallback');
        },

        createProjectLevelCallback: function (name, callbackName) {
            return new Callback(name, callbackName, 'ProjectLevelCallback');
        },

        createTestCase: function (testName, type) {
            return new TestCase(testName, type);
        }
    });

    return Model;
});