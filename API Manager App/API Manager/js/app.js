﻿// requireJs configuration
requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.2.2.min',
        kendo: 'lib/kendo.all.min',
        text: 'lib/text',
        underscore: 'lib/underscore-min',
        nicescroll: 'lib/nicescroll'
    },
    shim: {
        'APIManagerApp': {
            deps: ['jquery', 'kendo', 'underscore', 'nicescroll']
        },
        'kendo': {
            deps: ['jquery']
        }
    },
    waitSeconds: 0
});

require(['APIManagerApp'], function (APIManagerApp) {
    
    //Start APIManager app
    var APIManager = new APIManagerApp();
    APIManager.start();
});