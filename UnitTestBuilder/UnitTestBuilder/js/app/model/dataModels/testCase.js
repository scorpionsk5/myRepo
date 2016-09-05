define(['app/model/dataModels/baseModel', 'app/model/Enums'], function (BaseModel, Enums) {
    var TestCase = BaseModel.extend({
        init: function (name, type) {
            var isTypeValid = _.findWhere(Enums.TestCaseType, { Name: type }) ? true : false;
            if (isTypeValid) {
                this.Type = type;
                BaseModel.fn.init(name);
            }
            else {
                throw 'Invalid Type!!!';
            };
        },
        Type: ''    // [test, only, skip]
    });

    return TestCase;
});