define(['app/view/templateStore'], function (templateStore) {
    var utils = {
        // Method to build function string.
        functionBuilder: function (functionContents, functionArguments) {
            var functionArgumentsString = '',
                functionString = '';

            if (functionArguments) {
                functionArgumentsString = _.isArray(functionArguments) ? functionArguments.join(' , ') : functionArguments
            };

            functionString = 'function(' + functionArgumentsString + '){' + functionContents + '}';

            return functionString;
        }
    };

    var TestBuilder = kendo.Class.extend({
        init: function ($container, eventRouter) {
            this.routeEvent = eventRouter;
        }
    });

    return TestBuilder;
});