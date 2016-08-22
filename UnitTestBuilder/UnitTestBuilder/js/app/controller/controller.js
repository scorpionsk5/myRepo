define(function () {
    var Controller = kendo.Class.extend({
        init: function () {
            console.log('controller');
        },

        postInit: function (appInstance) {
            this.app = appInstance;
        }
    });

    return Controller;
});