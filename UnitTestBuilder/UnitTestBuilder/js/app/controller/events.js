define(function () {
    var EventHandlers = Object.create({
        loadPage: {
            home: function (args) {
                debugger;
            },
            about: function (args) {
                debugger;
            },
            help: function (args) {
                debugger;
            },
            projectBuilder: function (args) {
                var app = args.app;
                app.appView.clearContent();
                app.appView.loadTestBuilder();
                app.appController.routeEvent('bind', { app: app });
            }
        },
        projectBuilder: {
            projectBuilderToolbar: {
                addNewProject: function (args) {
                    var app = args.app;
                    app.appView.loadWindow('<div class="addNewProjectForm" title="Enter Project Name"><span class="Key">Project Name: </span><input type="text" class="ProjectNameInput k-textbox" placeholder="Enter Project Name"/><input type="button" value="Create Project" class="k-button CreateProject" data-action="createProject" /></div>', 'Add New Project');
                },
                addNewModule: function (args) {
                    var app = args.app,
                        vm = app.appModel.viewModel.get('App.Editor');
                    vm.set('EditMode', false);
                    vm.set('EditorData', app.appModel.createItem('Module'));
                },
                addNewTestCase: function (args) {
                    var app = args.app,
                        treeWidget = app.appView.treeViewWidget,
                        selectedDataItem = treeWidget.dataItem(treeWidget.select()),
                        vm = app.appModel.viewModel.get('App.Editor');
                    vm.set('EditMode', false);
                    vm.set('EditorData', app.appModel.createItem('TestCase'));
                }
            },
            projectTree: {
                select: function (args) {
                    var app = args.app,
                        selectedItemData = args.e.sender.dataItem(args.e.node),
                        vm = app.appModel.viewModel.get('App');
                    vm.set('Editor.EditMode', true);
                    vm.set('Editor.EditorData', selectedItemData);
                    vm.set('SelectedItem', selectedItemData);
                }
            },
            editor: {
                add: function (args) {
                    var app = args.app,
                        treeWidget = app.appView.treeViewWidget,
                        selectedDataItem = treeWidget.dataItem(treeWidget.select()),
                        vm = app.appModel.viewModel.get('App.Editor');

                    selectedDataItem.items.push(vm.get('EditorData'));
                },
                update: function (args) {
                    var app = args.app,
                        treeWidget = app.appView.treeViewWidget,
                        selectedDataItem = treeWidget.dataItem(treeWidget.select()),
                        vm = app.appModel.viewModel.get('App.Editor');

                    selectedDataItem = vm.get('EditorData');
                }
            }
        },
        windowEvents: {
            createProject: function (args) {
                var app = args.app, projectName = args.widget.element.find('.ProjectNameInput').val();
                app.appModel.createProject(projectName || 'Untitled');
                args.widget.close();
            }
        }
    });

    return EventHandlers;
});