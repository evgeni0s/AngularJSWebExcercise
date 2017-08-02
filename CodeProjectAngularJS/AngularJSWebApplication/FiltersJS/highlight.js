define(['application-configuration'], function (app) {
    var highlight = function ($sce, $compile) {
        var currentText = '';
        var highlightSegment = '';

        //with code block it will work fine, but style is teriible
        var incapsulateWithCodeTags = function ()
        {
            currentText = "<code>" +
                                currentText +
                          "<code/>";
        };

        var highlight = function (highlitableContent) {
            //var highlighted = $sce.trustAsHtml('<span class="highlighted">') +
            //                                        highlitableContent +
            //                  $sce.trustAsHtml('<span/>')    
            var snz = '<span class="highlighted">' + highlitableContent + '</span>';
            var highlighted = $sce.trustAsHtml(snz);

            return highlighted;
        };

        var highlightingElement = angular.element('<span class="highlighted"/>');



        //var highlightCompile = function (highlitableContent) {   
        //    var snz = '<span class="highlighted">' + highlitableContent + '</span>';
        //    var highlighted = $sce.trustAsHtml(snz);

        //    return highlighted;
        //};


  
        return function (text, phrase) {
            phrase = 'Units';
            if (phrase) {
                highlightSegment = phrase;
                currentText = text;
                var pattern = new RegExp('(' + phrase + ')', 'gi');
                //incapsulateWithCodeTags();
                var replacementExpression = highlight(phrase);
                currentText = currentText.replace(new RegExp('(' + phrase + ')', 'gi'), replacementExpression);
                return currentText;
            }
            return text;
        }
    }

    //http://blog.sodhanalibrary.com/2015/02/get-cursor-position-in-text-input-field.html#.WVfdnoTyiUk


    app.register.filter('highlight', highlight);
});