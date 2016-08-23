define(function () {
    var Controller = kendo.Class.extend({
        init: function () {
            console.log('controller');
        },

        start: function (appInstance) {
            this.app = appInstance;
        }
    });

    return Controller;
});