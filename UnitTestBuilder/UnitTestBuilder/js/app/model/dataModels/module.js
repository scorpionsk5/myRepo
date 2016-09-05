define(['app/model/dataModels/baseModel'], function (BaseModel) {
    var Module = BaseModel.extend({
        init: function (moduleName) {
            BaseModel.fn.init(moduleName);
        },
        Type: 'Module'
    });

    return Module;
});