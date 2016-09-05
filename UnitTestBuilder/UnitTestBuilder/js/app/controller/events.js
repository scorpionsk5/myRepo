define(function () {
    var app;
    var EventHandlers = kendo.Class.extend({
        init: function (appInstance) {
            app = appInstance;
        },
        menuEvents: {
            loadHome: function (e) {
                debugger;
            },
            loadAbout: function (e) {
                debugger;
            },
            loadHelp: function (e) {
                debugger;
            },
            loadTestBuilder: function (e) {
                debugger;
            },
            loadTestRunner: function (e) {
                debugger;
            }
        },
        projectBuilder: {
            ProjectBuilderToolbar: {

            },
            treeView: {

            }
        }
    });

    return EventHandlers;
});