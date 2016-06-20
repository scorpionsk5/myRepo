(function () {
    // requireJs configuration
    requirejs.config({
        baseUrl: 'js',
        paths: {
            jquery: 'lib/jquery-2.2.2.min',
            kendo: 'lib/kendo.all.min',
            text: 'lib/text',
            underscore: 'lib/underscore-min',
            nicescroll: 'lib/nicescroll'
        },
        waitSeconds: 0
    });

    require(['app/APIManager'], function (APIManagerApp) {
        //Start APIManager app
        var APIManager = new APIManagerApp();
        APIManager.start();
    });

})();