define(['app/controller/events'], function (eventHandlers) {

    var Controller = kendo.Class.extend({

        start: function (appInstance) {
            this.app = appInstance;
            this.initRouter();
        },

        initRouter: function () {
            var me = this;
            this.app.appView.$mainContainer.on('click', function (e) {
                var dataAction = $(e.target).data('action');
                dataAction && me.routeEvent.call(me, dataAction, e);
            });
        },

        routeEvent: function (actionName, e) {
            actionName && eventHandlers[actionName] && eventHandlers[actionName].call(this, e);
        }
    });

    return Controller;
});