define(['app/model/dataModels/baseModel'], function (BaseModel) {
    var Callback = BaseModel.extend({
        init: function (name, subType) {
            this.SubType = subType;
            BaseModel.fn.init(name);
        },
        Type: 'Callback',
        SubType: '',
        CallbackName: '',
        CodeContent: [],
        Arguments: []
    });

    return Callback;
});