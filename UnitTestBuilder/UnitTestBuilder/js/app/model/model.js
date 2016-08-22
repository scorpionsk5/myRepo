define(function () {
    var Model = kendo.Class.extend({
        init: function () {
            console.log('model');
        },

        postInit: function (appInstance) {
            this.app = appInstance;
        }
    });

    return Model;
});