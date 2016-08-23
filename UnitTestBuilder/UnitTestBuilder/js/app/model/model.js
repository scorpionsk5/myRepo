define(function () {
    var Model = kendo.Class.extend({
        init: function () {
            console.log('model');
        },

        load: function (appInstance) {
            this.app = appInstance;
        }
    });

    return Model;
});