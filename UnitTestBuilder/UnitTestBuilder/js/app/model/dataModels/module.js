define(['app/model/dataModels/baseModel'],function (BaseModel) {
    var Module = BaseModel.extend({
        init: function (name) {
            BaseModel.fn.init(name);
        },
        Type:'Module'
    });

    return Module;
});