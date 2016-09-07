define(function () {
    var BaseModel = kendo.Class.extend({
        init: function (name) {
            this.Name = name
            this.Id = kendo.guid();
        },
        Name: '',
        Id: '',
        items: [],
        addItem: function (item) {
            this.items.push(item);
        },
        toString: function () { }
    });

    return BaseModel;
});