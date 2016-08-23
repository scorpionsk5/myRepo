define(['app/model/model', 'app/view/view', 'app/controller/controller', 'QUnit', 'underscore'], function (Model, View, Controller) {
    var app = kendo.Class.extend({
        init: function ($container) {
            this.appModel = new Model();
            this.appView = new View($container);
            this.appController = new Controller();
        },

        startApplication: function () {
            this.appModel.load(this);
            this.appView.render(this);
            this.appController.start(this);
        }
    });

    return app;
});