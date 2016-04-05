// Method to load templates
(function () {
    var definitions = {},
        html = function (part, key) {
            definitions['text!../../../' + part + '.html'] = key || part;
        };

    // Templates path
    html('templates/mainContent');
    html('templates/itemContent');

    var dependencies = [];

    // Build dependencies list
    for (var key in definitions) {
        dependencies.push(key);
    }

    // Add 'kendo' as first item in dependencies list
    dependencies.unshift('kendo');

    // Load dependencies using requireJs
    define(dependencies, function (kendo) {

        var templates = arguments;

        var templateStoreClass = function (Args) {
            this.APIManager = Args.APIManager;
            this.TemplateHTML = {};// html strings
            this.TemplateCache = {};// kendo template functions

            for (var i = 1; i < templates.length; i++) {
                this.registerTemplate(definitions[dependencies[i]], templates[i]);
            }
        };

        // Method to convert template html string to kendo template function
        templateStoreClass.prototype.registerTemplate = function (templateId, template) {
            if (this.TemplateCache[templateId]) return;

            try {
                this.TemplateHTML[templateId] = template;
                this.TemplateCache[templateId] = kendo.template(template);
            }
            catch (err) {
                console.log(err);
                this.APIManager.APIManagerView.displayMessage('Error occured while registering templates. Please check console for more details!!!');
            };
        };



        return templateStoreClass;
    });
})();

