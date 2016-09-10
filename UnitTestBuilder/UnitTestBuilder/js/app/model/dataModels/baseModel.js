define(function () {
    var BaseModel = kendo.Class.extend({
        init: function (name) {
            this.Name = name || '';
            this.Id = kendo.guid();
        },
        Name: '',
        Id: '',
        items: []
    });

    return BaseModel;
});