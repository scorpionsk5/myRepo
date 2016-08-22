require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.4',
        kendo: 'lib/kendo',
        QUnit: 'lib/QUnit'
    },
    shim: {
        'kendo': {
            deps: ['jquery']
        },
        'app': {
            deps: ['kendo', 'QUnit']
        }
    },
    waitSeconds: 0
});

require(['app'], function (App) {

    var $container = $(document.body),
        app = new App($container);

    app.loadApplication();

});