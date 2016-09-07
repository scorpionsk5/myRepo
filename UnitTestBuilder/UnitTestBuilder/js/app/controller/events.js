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
            }
        },
        projectBuilder: {
            projectBuilderToolbar: {
                addNewProject: function (args) {
                    var app = args.app;
                    app.appModel.createProject('test project');
                    app.testBuilder.createProject(app.appModel.viewModel.get('App.Project'));
                }
            },
            projectTree: {

            },
            editor: {

            }
        }
    });

    return EventHandlers;
});