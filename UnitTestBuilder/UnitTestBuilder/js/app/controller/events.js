define(['app/utils'], function (utils) {
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
                    var app = args.app,
                    windowWidget = app.appView.loadWindow('<div class="addNewProjectForm" title="Enter Project Name"><span class="Key">Project Name: </span><input type="text" class="ProjectNameInput k-textbox" placeholder="Enter Project Name"/><input type="button" value="Create Project" class="k-button CreateProject" data-action="createProject" /></div>', 'Add New Project');
                },
                addNewModule: function (args) {
                    var app = args.app,
                        vm = app.appModel.viewModel.get('App.Editor');
                    vm.set('EditMode', false);
                    vm.set('EditorData', app.appModel.createItem('Module'));
                },
                addNewTestCase: function (args) {
                    var app = args.app,
                        vm = app.appModel.viewModel.get('App.Editor');
                    vm.set('EditMode', false);
                    vm.set('EditorData', app.appModel.createItem('TestCase'));
                    app.appView.setHeaderAndFooterForCodeMirror(vm.get('EditorData.Arguments'));
                },
                addNewCallback: function (args) {
                    var app = args.app,
                        treeWidget = app.appView.treeViewWidget,
                        selectedDataItem = treeWidget.dataItem(treeWidget.select()),
                        vm = app.appModel.viewModel.get('App.Editor'),
                        subType = 'ModuleLevelCallback';

                    if (selectedDataItem.Type === 'Project') {
                        subType = 'ProjectLevelCallback';
                    }
                    vm.set('EditMode', false);
                    vm.set('EditorData', app.appModel.createItem('Callback', '', subType));
                    app.appView.setHeaderAndFooterForCodeMirror(vm.get('EditorData.Arguments'));
                },
                deleteItem: function (args) {
                    var app = args.app,
                        treeWidget = app.appView.treeViewWidget,
                        $selectedItem = treeWidget.select(),
                        selectedItem = treeWidget.dataItem($selectedItem),
                        parentItem = treeWidget.dataItem(treeWidget.parent($selectedItem));

                    //treeWidget.remove(treeWidget.select());

                    $.each(parentItem.items, function (index, item) {
                        if (item.Id === selectedItem.Id) {
                            parentItem.items.splice(index, 1);
                            app.appModel.viewModel.set('App.Editor.EditorData', {});
                            return false;
                        }
                    });
                }
            },
            projectTree: {
                change: function (args) {
                    var app = args.app,
                        treeWidget = args.e.sender,
                        selectedItemData = treeWidget.dataItem(treeWidget.select()),
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
                        vm = app.appModel.viewModel.get('App.Editor');

                    treeWidget.select(treeWidget.append(vm.get('EditorData'), treeWidget.select()));
                },
                update: function (args) {
                    var app = args.app,
                        treeWidget = app.appView.treeViewWidget,
                        selectedDataItem = treeWidget.dataItem(treeWidget.select()),
                        vm = app.appModel.viewModel.get('App.Editor');

                    selectedDataItem = vm.get('EditorData');
                    app.appController.routeEvent('bind', { app: app });
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