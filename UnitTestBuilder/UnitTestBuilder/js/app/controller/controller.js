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
        }
    }

    var Controller = kendo.Class.extend({

        start: function (appInstance) {
            var me = this;
            me.app = appInstance;
            me.initRouter();

            me.app.appView.$mainContainer.find('.MainMenu').on('click', function (e) {
                var dataAction = $(e.target).data('action');
                dataAction && me.routeEvent('loadPage/:' + dataAction, { e: e, app: me.app });
            });
        },

        initRouter: function () {
            // Event listener for menu items.
            var me = this,
                router = new Router();

            router.registerRoute(routeHandlers);

            me.routeEvent = $.proxy(router.route, router);
        },

        //routeEvent: function (actionName, e) {
        //    if (actionName && this.eventHandlers.menuEvents[actionName]) {
        //        e.preventDefault();
        //        this.eventHandlers.menuEvents[actionName].call(this, e);
        //    };
        //}
    });

    return Controller;
});