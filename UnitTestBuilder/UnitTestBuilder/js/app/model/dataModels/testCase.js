define(['app/model/dataModels/baseModel'], function (BaseModel) {
    var TestCase = BaseModel.extend({
        init: function (name, type) {
            this.Type = type;
            BaseModel.fn.init(name);
        },
        Type: ''    // [test, only, skip]
    });

    return TestCase;
});