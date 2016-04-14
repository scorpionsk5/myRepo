define(['underscore', 'kendo'], function (_, kendo) {

    return new (function () {

        var TemplateCache = {}, // kendo template functions
            me = this;

        var fetchTemplate = function (config) {
            config = $.extend(
                {
                    cache: false,
                    async: false, dataType: 'text'
                }, config);

            $.ajax(config);
        };

        // Method to convert template html string to kendo template function
        me.prototype.registerTemplate = function (templateId, template) {
            if (TemplateCache[templateId]) return;

            TemplateCache[templateId] = this.compileTemplate(template);
        };

        me.prototype.compileTemplate = function (template) {
            return kendo.template(template);
        };

        me.prototype.getTemplate = function (templateId) {
            if (!TemplateCache[templateId]) {
                fetchTemplate({
                    url: 'templates/' + templateId, context: me,
                    success: function (template) {
                        me.registerTemplate(templateId, template);
                    }
                });
            };

            return TemplateCache[templateId];
        };

        me.prototype.renderTemplate = function (templateId, data) {
            return me.getTemplate(templateId)(data);
        };
    })();

});

