(function () {
    // requireJs configuration
    requirejs.config({
        baseUrl: 'js',
        paths: {
            jquery: 'lib/jquery',
            kendo: 'lib/kendo',
            text: 'lib/text',
            underscore: 'lib/underscore',
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