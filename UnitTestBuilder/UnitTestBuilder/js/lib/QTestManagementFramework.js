(function (window, kendo, $) {

    // utils object where utility functions are stored.
    var utils = Object.create();

    // Template Store
    (function (kendo, $) {  // kendo template functions.

        var TemplateCache = {
            testBuilderMainTemplate: '<div class="TestBuilderContainer" data-project-id="#=data.projectId#"><h2 class="Headers">Unit Test Builder</h2><div class="Field"><span class="Key" title="Project Title">Project Title: </span><input class="k-textbox ProjectTitleTextbox" placeholder="Enter Project Title" title="Enter Project Title" type="text" data-bind="value:ViewModel.ProjectTitle" /></div><div class="TestCaseContainer"></div></div>',

            testCaseItemTemplate: ''
        },

            // Method to make ajax call and fetch template.
            fetchTemplate = function (config) {
                config = $.extend({
                    cache: false,
                    async: false,
                    dataType: 'text'
                }, config);

                $.ajax(config);
            };

        // Template store Object.
        var templateStore = Object.create({

            // Method to convert template html string to kendo template function.
            registerTemplate: function (templateId, template) {
                if (TemplateCache[templateId]) return;

                TemplateCache[templateId] = this.compileTemplate(template);
            },

            // Method to complie template into kendo template function.
            compileTemplate: function (template) {
                return kendo.template(template);
            },

            // Method to get template by making ajax calls.
            getTemplate: function (templateId) {
                var me = this;
                if (!TemplateCache[templateId]) {
                    fetchTemplate({
                        url: 'js/app/view/templates/' + templateId,
                        context: me,
                        success: function (template) {
                            me.registerTemplate(templateId, template);
                        }
                    });
                };

                return TemplateCache[templateId];
            },

            // Method to render template by executing compiled template with data as argument.
            renderTemplate: function (templateId, data) {
                return this.getTemplate(templateId)(data);
            }

        });

        // Export to utils object.
        utils.templateStore = templateStore;

    })(kendo, jQuery);

    (function () {
        // Method to build function string. Arguments - functionContents as string and functionArguments (optional) is string or array of string.
        var buildFunction = function (functionContents, functionArguments) {
            var functionArgumentsString = '',
                functionString = '';

            if (functionArguments) {
                functionArgumentsString = _.isArray(functionArguments) ? functionArguments.join(' , ') : functionArguments
            };

            functionString = 'function(' + functionArgumentsString + '){' + functionContents + '}';

            return functionString;
        };

        utils.buildFunction = buildFunction;

    })();

    // File Manager module.
    (function (kendo, $) {
        var saveFile = function (fileContents, fileName) {

        };
    })(kendo, jQuery);

    var QTestManagementFramework = kendo.Class.extend({
        init: function ($container, options) {
        }
    });

})(window, kendo, jQuery);