define(['app/model/dataModels/baseModel'], function (BaseModel) {
    var Project = BaseModel.extend({
        init: function (projectName) {
            BaseModel.fn.init(projectName);
        },
        Type: 'Project'
    });

    return Project;
});