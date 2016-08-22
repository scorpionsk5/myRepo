define(['app/model/model', 'app/view/view', 'app/controller/controller'], function (Model, View, Controller) {
    var app = kendo.Class.extend({
        init: function ($container) {
            this.appModel = new Model();
            this.appView = new View($container);
            this.appController = new Controller();
        },

        loadApplication: function () {
            this.appModel.postInit(this);
            this.appView.postInit(this);
            this.appController.postInit(this);
        }
    });

    return app;
});