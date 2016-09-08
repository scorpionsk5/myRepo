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
                    app.appView.loadWindow('<div class="addNewProjectForm" title="Enter Project Name"><span class="Key">Project Name: </span><input type="text" class="ProjectNameInput" placeholder="Enter Project Name"/><input type="button" value="Create Project" class="k-textBox CreateProject" data-action="createProject" /></div>', 'Add New Project');
                }
            },
            projectTree: {
                select: function (e) {

                }
            },
            editor: {

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