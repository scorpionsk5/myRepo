define(['app/model/dataModels/baseModel', 'app/model/Enums'], function (BaseModel, Enums) {
    var Callback = BaseModel.extend({
        init: function (name, callbackName, hierarchy) {
            var isCallbackValid = _.findWhere(Enums[hierarchy], { Name: callbackName }) ? true : false;
            if (isCallbackValid) {
                this.CallbackName = callbackName;
                BaseModel.fn.init(name);
            }
            else {
                throw 'Invalid Callback Name!!!';
            };
        },
        Type: 'Callback',
        CallbackName: '',
        Arguments: [],
        addArgument: function (item) {
            this.Arguments.push(item);
        }
    });

    return Callback;
});