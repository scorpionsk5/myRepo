define(['app/controller/events', 'Router'], function (eventHandlers, Router) {

    var routeHandlers = {
        'loadPage/:pageName': function (pageName, args) {
            eventHandlers.loadPage && eventHandlers.loadPage[pageName](args);
        },
        'testBuilderEvent/:sectionName/:eventName': function (sectionName, eventName, args) {
            var eventHandlerSection = sectionName !== 'null' ? eventHandlers.projectBuilder[sectionName] : eventHandlers.projectBuilder;

            eventHandlerSection[eventName] && eventHandlerSection[eventName](args);
        },
        'bind': function (args) {
            var app = args.app;
            kendo.bind(app.appView.$appContainer, app.appModel.viewModel);
        },
        'windowEvents/:eventName': function (eventName, args) {
            eventName && eventHandlers.windowEvents[eventName] && eventHandlers.windowEvents[eventName](args);
        }
    }

    var Controller = kendo.Class.extend({

        start: function (appInstance) {
            var me = this;
            me.app = appInstance;
            me.initRouter();
        },

        initRouter: function () {
            var me = this,
                router = new Router();

            router.registerRoute(routeHandlers);

            me.routeEvent = $.proxy(router.route, router);
        }
    });

    return Controller;
});