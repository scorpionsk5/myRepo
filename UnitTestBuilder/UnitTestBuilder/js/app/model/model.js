define(['app/utils', 'app/model/dataModels/testCase', 'app/model/dataModels/module', 'app/model/dataModels/callbacks', 'app/model/Enums', 'app/model/dataModels/project'], function (utils, TestCase, Module, Callback, Enums, Project) {

    var EnumModel = {
        Module: '_createModule',
        TestCase: '_createTestCase',
        Callback: '_createCallback'
    };

    var Model = kendo.Class.extend({
        init: function () {
            this.viewModel = kendo.observable({
                App: {
                    Project: [],
                    Enums: Enums,
                    Editor: {
                        EditMode: '',
                        EditorData: {}
                    },
                    SelectedItem: {}
                }
            });
        },

        load: function (appInstance) {
            this.app = appInstance;
        },

        createProject: function (ProjectName) {
            this.viewModel.App.set('Project', [new Project(ProjectName)]);
        },

        loadExisitingProject: function (projectData) {
            this.viewModel.App.set('Project', projectData);
        },

        createItem: function (type, arg1, arg2) {
            try {
                return this[EnumModel[type]](arg1, arg2);
            } catch (e) {
                console.error(e);
                return [];
            }
        },

        _createModule: function (moduleName) {
            return new Module(moduleName);
        },

        _createCallback: function (name, subType) {
            return new Callback(name, subType);
        },

        _createTestCase: function (testName, type) {
            return new TestCase(testName, type);
        }
    });

    return Model;
});