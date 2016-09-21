define(['app/model/dataModels/baseModel'], function (BaseModel) {
    var TestCase = BaseModel.extend({
        init: function (name) {
            BaseModel.fn.init(name);
        },
        Type: 'TestCase',
        SubType: '',
        CodeContent: [],
        Arguments: ['assert']
    });

    return TestCase;
});