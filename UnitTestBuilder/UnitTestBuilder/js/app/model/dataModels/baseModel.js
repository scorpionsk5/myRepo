define(function () {
    var BaseModel = kendo.Class.extend({
        init: function (name) {
            this.Name = name
            this.Id = kendo.guid();
        },
        Name: '',
        Id: '',
        Contents: [],
        addContent: function (item) {
            this.Contents.push(item);
        },
        toString: function () { }
    });

    return BaseModel;
});