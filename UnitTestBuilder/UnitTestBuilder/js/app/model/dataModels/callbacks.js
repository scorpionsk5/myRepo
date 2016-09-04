define(['app/model/dataModels/baseModel'], function (BaseModel) {
    var Callback = BaseModel.extend({
        init: function (name, callbackName) {
            this.CallbackName = callbackName;
            BaseModel.fn.init(name);
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