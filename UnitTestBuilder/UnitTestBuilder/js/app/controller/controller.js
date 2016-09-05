define(['app/controller/events'], function (EventHandlers) {

    var Controller = kendo.Class.extend({

        start: function (appInstance) {
            this.app = appInstance;
            this.eventHandlers = new EventHandlers(this.app);
            this.initRouter();
        },

        initRouter: function () {
            // Event listener for menu items.
            var me = this;
            this.app.appView.$mainContainer.find('.MainMenu').on('click', function (e) {
                var dataAction = $(e.target).data('action');
                dataAction && me.routeMenuEvent.call(me, dataAction, e);
            });
        },

        routeMenuEvent: function (actionName, e) {
            if (actionName && eventHandlers.menuEvents[actionName]) {
                e.preventDefault();
                eventHandlers.menuEvents[actionName].call(this, e);
            };
        }
    });

    return Controller;
});