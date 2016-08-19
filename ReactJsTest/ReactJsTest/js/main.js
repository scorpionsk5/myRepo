require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.4',
        kendo: 'lib/kendo',
        react: 'lib/react'
    },
    shim: {
        'kendo': {
            deps: ['jquery']
        }
    },
    waitSeconds: 0
});

require(['reactKendo'], function (reactKendo) {

    console.log(reactKendo);

});