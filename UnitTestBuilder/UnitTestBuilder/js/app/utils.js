define(function () {
    // utils object where utility functions are stored.
    var utils = kendo.Class.extend({
        // Method to build function string. Arguments - functionContents as string and functionArguments (optional) is string or array of string.
        buildFunction: function (functionContents, functionArguments) {
            var functionArgumentsString = '',
                functionString = '';

            if (functionArguments) {
                functionArgumentsString = _.isArray(functionArguments) ? functionArguments.join(' , ') : functionArguments
            };

            functionString = 'function(' + functionArgumentsString + '){' + functionContents + '}';

            return functionString;
        },

        // Method to Save Exported file to local system.
        saveFile: function (fileName, fileContent, fileType) {
            var blob = new Blob([fileContent], { type: fileType || 'application/xml' }),
                elem = document.createElement('a'),
                def = $.Deferred();

            if (window.navigator.msSaveBlob) {
                // for IE
                window.navigator.msSaveBlob(blob, fileName);
                return;
            }   // TODO: Implement download in safari with file name
            //else if (/constructor/i.test(window.HTMLElement)) {   // to download in safari    
            //    var reader = new FileReader();
            //    reader.onloadend = function () {
            //    };
            //    reader.readAsDataURL(blob);
            //}
            elem.href = /constructor/i.test(window.HTMLElement) ?
                // for Safari
                'data:attachment/file;charset=utf-8,' + encodeURIComponent(fileContent) :
                // for other browsers
                window.URL.createObjectURL(blob);

            elem.href = window.URL.createObjectURL(blob);
            elem.download = fileName;
            document.body.appendChild(elem);
            elem.click();
            elem.remove();
        },

        // Method to read content of file using FileReader class.
        getFileContents: function (rawFile) {
            var def = $.Deferred(),
                fileReader = new FileReader();

            fileReader.readAsText(rawFile, "UTF-8");

            fileReader.onloadend = function (args) {
                def.resolve(args.target.result);
            };

            fileReader.onerror = function (args) {
                def.reject(args);
            };

            return def.promise();
        }
    });

    return utils;
});