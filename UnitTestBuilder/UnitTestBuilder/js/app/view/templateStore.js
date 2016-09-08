define(function () {

    var TemplateCache = {}, // kendo template functions

        // Method to make ajax call and fetch template
        fetchTemplate = function (config) {
            config = $.extend({
                cache: false,
                async: false,
                dataType: 'text'
            }, config);

            $.ajax(config);
        };

    // Template store Object
    var templateStore = Object.create({

        // Method to convert template html string to kendo template function
        registerTemplate: function (templateId, template) {
            if (TemplateCache[templateId]) return;

            TemplateCache[templateId] = this.compileTemplate(template);
        },

        // Method to complie template into kendo template function
        compileTemplate: function (template) {
            return kendo.template(template);
        },

        // Method to get template by making ajax calls
        getTemplate: function (templateId) {
            var me = this;
            if (!TemplateCache[templateId]) {
                fetchTemplate({
                    url: 'js/app/view/templates/' + templateId + '.html',
                    context: me,
                    success: function (template) {
                        me.registerTemplate(templateId, template);
                    }
                });
            };

            return TemplateCache[templateId];
        },

        // Method to render template by executing compiled template with data as argument
        renderTemplate: function (templateId, data) {
            data = data || {};
            return this.getTemplate(templateId)(data);
        }

    });

    return templateStore;
});

