require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.2.2.min',
        //kendo: 'lib/kendo.all.min',
        kendo: 'lib/kendo',
        QUnit: 'lib/QUnit',
        underscore: 'lib/underscore-min',
        nicescroll: 'lib/nicescroll',
        Router: 'lib/router'
    },
    shim: {
        'kendo': {
            deps: ['jquery']
        },
        'app/app': {
            deps: ['kendo']
        },
        'nicescroll': {
            deps: ['jquery']
        }
    },
    waitSeconds: 0
});

require(['app/app'], function (App) {

    var $container = $(document.body),
        app = new App($container);

    app.startApplication();

});