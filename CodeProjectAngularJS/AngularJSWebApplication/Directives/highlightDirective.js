define(['application-configuration'], function (app) {
    var highlight = function ($sce, $compile) {
        var textContainer = {};
        var textToFind = '';
        var pattern = {};
        var lineBreakPattern = /\r|\n/;
        var highlightingElement = angular.element('<span class="highlighted"/>');
        var highlightingElementTemplate = '<div class="highlighted"/>';
        var parentRectangle = {};
        var selectionRectangles = [];
        var selectionElements = [];
        var _scope = {};
        var pageNumber = 0;

        //with code block it will work fine, but style is teriible
        var incapsulateWithCodeTags = function () {
        };

        //var highlight = function (highlitableContent) {
        //    //var highlighted = $sce.trustAsHtml('<span class="highlighted">') +
        //    //                                        highlitableContent +
        //    //                  $sce.trustAsHtml('<span/>')    
        //    var snz = '<span class="highlighted">' + highlitableContent + '</span>';
        //    var highlighted = $sce.trustAsHtml(snz);

        //    return highlighted;
        //};

        var clearHighlightedElements = function () {
            var hilightElements = textContainer[0].querySelectorAll('.highlighted');
            if (!hilightElements) {
                return;
            }
            for (var i = 0; i < hilightElements.length; i++) {
                hilightElements[i].remove();
            }
        };


        //var highlightCompile = function (highlitableContent) {   
        //    var snz = '<span class="highlighted">' + highlitableContent + '</span>';
        //    var highlighted = $sce.trustAsHtml(snz);

        //    return highlighted;
        //};



        //return function (text, phrase) {
        //    phrase = 'Units';
        //    if (phrase) {
        //        highlightSegment = phrase;
        //        currentText = text;
        //        var pattern = new RegExp('(' + phrase + ')', 'gi');
        //        //incapsulateWithCodeTags();
        //        var replacementExpression = highlight(phrase);
        //        currentText = currentText.replace(new RegExp('(' + phrase + ')', 'gi'), replacementExpression);
        //        return currentText;
        //    }
        //    return text;
        //}

        //var highlightDiv = document.createElement('span');
        //highlightDiv.style.backgroundColor = 'blue';
        //// Обернем наш Range в спан
        //rng.surroundContents(highlightDiv);

        var textNodeFilter = function (value) {
            return value.nodeType == Node.TEXT_NODE;
        }

        //cant access to text. Idea is to generate rectangles and show overlayed div on top
        //Second solution  - rng.surroundContents(highlightDiv);
        // may be need to add scope.$watch('SearchModel', function (value) {
        var createRectanglesInRange = function (start, end) {
            var range = document.createRange();
            var jqueryEl = textContainer[0];
            //var textChildren = jqueryEl.childNodes.filter(textNodeFilter);        wont work as childNodes is not array 
            //for (var i = 0; i < textChildrenlength; i++) {
            //    // normaly there should be 1 childe
            //    textChildren[i]
            //}
            var textChildren = Array.prototype.filter.call(jqueryEl.childNodes, textNodeFilter);

            var searchAt = textChildren[0];
            range.setStart(searchAt, start);
            range.setEnd(searchAt, end);
            if (lineBreakPattern.test(range.toString())) {
                var i = 0;
                i++;
                //recursion
            }

            var rect = range.getBoundingClientRect();
            var rectInParentCoordinates = translateToParentCoordinates(rect);
            return rectInParentCoordinates;
        }

        var createNewSearchResult = function ()
        {
            return _scope.highlightModel.createNewSearchResult();
        }
        

        // because rectangles calculated in screen coordinates, need to make aditional tweak:
        // childe rect - parent rect
        var translateToParentCoordinates = function (rect) {
            //rect.top -= parentRectangle.top;
            //rect.bottom -= parentRectangle.bottom;
            ////rect.bottom = (parentRectangle.bottom - rect.right);
            //rect.left -= parentRectangle.left;
            ////rect.right = (parentRectangle.right - rect.right);
            //rect.right -= parentRectangle.right;
            ////something like: Object {top: 50, right: -200, bottom: -250, left: 100 }
            //var result = new CustomRectangle();
            var result = createNewSearchResult();
            result.top = rect.top - parentRectangle.top;
            result.bottom = rect.bottom - parentRectangle.bottom;
            result.left = rect.left - parentRectangle.left;
            result.right = rect.right - parentRectangle.right;
            result.width = rect.width;
            result.height = rect.height;
            return result;
        }

        var attachHighlightElements = function () {
            for (var i = 0; i < selectionRectangles.length; i++) {
                var newEl = angular.element(highlightingElementTemplate);
                newEl.css({
                    'position': 'absolute',
                    'left': selectionRectangles[i].left + 'px',
                    'top': selectionRectangles[i].top + 'px',
                    'width': selectionRectangles[i].width + 'px',
                    'height': selectionRectangles[i].height + 'px',
                    //'height': selectionRectangles[i].height,
                    //'background': 'yellow'
                    //'background-image': 'url(' + url + ')',
                    //'background-size': 'cover'
                });
                textContainer.append(newEl);
                $compile(newEl)(_scope);
            }
        };


        var beginHighlight = function () {
            selectionRectangles = [];
            clearHighlightedElements();
            var searchAt = textContainer.text();

            while (pattern.test(searchAt) == true) {
                var newRectangles = createRectanglesInRange(pattern.lastIndex - textToFind.length, pattern.lastIndex);
                selectionRectangles.push(newRectangles);
                newRectangles.saveOnPage(pageNumber);
            }
            attachHighlightElements();
        }

        return {
            scope:
            {
                highlightModel: '=',
                //getSearchResultTemplate: '='
            },
            //transclude: true,
            link: function ($scope, element, attrs) {
                //var i = 0;
                //i++;
                ////textToFind = attrs.highlightDirective;
                //textToFind = "Units";
                //pattern = new RegExp('(' + textToFind + ')', 'gi');
                ////textContainer = element[0];
                //textContainer = element;
                //beginHighlight();
                _scope = $scope;
                //$scope.$watch('highlightModel.Text', function (value) {
                //$scope.$watch($scope.highlightModel.SearchQuery, function (value) {
                //var searchQuery = $scope.highlightModel.SearchQuery;
                //$scope.$watch(searchQuery.Text, function (value) {
                //pageNumber = $scope.highlightModel.PageNumber;
                $scope.$watch('highlightModel.SearchQuery.Text', function (value) {
                    if (typeof value !== "string" || value.length == 0) {
                        return;
                    }
                    textToFind = value;
                    pageNumber = $scope.highlightModel.PageNumber;
                    pattern = new RegExp('(' + textToFind + ')', 'gi');
                    //textContainer = element[0];
                    textContainer = element;
                    parentRectangle = element[0].getBoundingClientRect();
                    beginHighlight();
                    $scope.highlightModel.highlightComplete();
                });

            }
        };

    };

    //http://blog.sodhanalibrary.com/2015/02/get-cursor-position-in-text-input-field.html#.WVfdnoTyiUk


    app.register.directive('highlightDirective', highlight);
});