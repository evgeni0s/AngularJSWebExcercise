
define(['application-configuration'], function (app) {
    var pagination = function ($parse, $timeout) {
        var settings = {
            Pages: [],
            //PageTemplate: '<div  class="tempPage"/>', /*'<article class="individualPage" />',*/
            //PageSmallestUnit: " ",/*"\n",*/
            //ContentBox: {},
            
            ParentHeight: 0,
            ParentHeightCorrection: 0,
            //Width: 100,
            //LineHight: 30,
            //Next: "",
            //Current: "",
            //Previous: "",
            //Text: [],
        };

        var parent = {};
        // measures height of text
        //var tempPage = angular.element('<div  class="tempPage">{{tempPageText}}<div/>');
        //var tempPage = angular.element('<article  class="bookPage" style="height:auto">{{tempPageText}}<article/>');
        var tempPage = angular.element('<article id="tempItemAddedByPaginationDirective"  class="bookPage" style="height:auto; width:50%"/>');
        //var tempPageText = "";


        Object.defineProperty(this, "tempPageText", {

            get: function () {
                return tempPage.text();
            },

            set: function (value) {
                tempPage.text(value);
            }
        });

        var cleanUp = function ()
        {
            //settings.Pages.empty();
            settings.Pages.length = 0;
            settings.Next = settings.Current = settings.Previous = "";
        }

        var paginate = function (words, index) {
            if (words.length === 0
                // to do: dirty
                || (words.length == 1 && words[0] === ""))
            {
                // control is not initialized or there was text, but was removed. Update result accordingly.
                cleanUp();
                return;
            }
            //var tempPage = angular.element(settings.PageTemplate);
            if (typeof index === "undefined" || index === 0) {
                //settings.Pages.empty();
                //tempPage.empty();
                //parent.empty();

                // first call. Delete previous pages, add tempPage
                cleanUp();
                //tempPage.value = "something";
                //tempPage.text("something");  ///with this it works
                

                //firt word goes without space. Hm... what if text starts with space"     asdadssa"? 
                //index = 0;
                //tempPage.value = words[0]; //does not work 
                //tempPage.text(tempPage.text() + words[0]);

                //tempPageText += "\n";
                //tempPageText += "\n\n";
                //tempPageText += "\n\n\n";
                //$scope.$apply();
                //tempPage.text(tempPageText);
                

                //parent.append(tempPage);
                tempPageText = words[0];
                parent.append(tempPage);
                index = 1;
            }

            if (index >= words.length)
            {
                // exit recursion
                //parent.remove(tempPage);
                tempPage.remove();
                return;
            }
            //var words = contentBox.text().split(' ');

            //settings.ParentHeight = parent[0].offsetHeight;


            //tempPage.text("test text");
            //var el = tempPage[0];
            //var el = parent[0];
            //var height = el.offsetHeight;
            //var width = el.offsetWidth;

            

            while (index < words.length && tempPage[0].offsetHeight < settings.ParentHeight)
            {
                tempPageText += ' ' + words[index];
                index++;
            }
            if (tempPage[0].offsetHeight > settings.ParentHeight)
            {
                // index - 1 - correction for while loop increment
                var lenthOfLastWord = words[index - 1].length + 1;
                // delete last substring because it does there is no more place for it
                //tempPage.text(tempPage.text().slice(0, -lenthOfLastWord);
                tempPageText = tempPageText.slice(0, -lenthOfLastWord);
            }
            settings.Pages.push(tempPageText);
            tempPage.empty();
            paginate(words, index);
            //var str = "12345.00";
            //str = str.slice(0, -1);
        };


        return {
            scope:
            {
                //pagesLoaded: '&',

                pagesLoaded: '=',
                //pagesLoaded: 'onPagesLoaded',
                /// OnPagesLoaded(payload)
                paginationText: '=',

                //tempPageText = sdfsdf,

            },
            /*
             priority and timeouts actually not needed if add aetra container for ng-repeat
            */
            //priority: 1001, // ensures directive runs before ng-repeate
            link: function (scope, element, attrs, ngModel) { 

                //element.bind("DOMMouseScroll mousewheel onmousewheel", function (event)
                //{
                //    //element.scrollLeft(100);
                //    //var testEl = $('#scrollArea');
                //    //testEl.scrollLeft(100);
                //    ////var 
                //    //testEl.animate({ scrollLeft: testEl.offset().left - 50 }, "slow");

                //    //angular.element('#scrollArea').scrollLeft(angular.element('#scrollArea').scrollLeft() - 30);
                //    //var delta = $('#scrollArea').offset().left - 50;
                //    //$('#scrollArea').animate({ 'scrollLeft': delta }, 10);
                //    //var scrollLeft = $('#scrollArea').scrollLeft();
                   
                //    if (event.deltaY > 0) {
                //        $("#scrollArea").animate({ scrollLeft: ('-=' + event.deltaY) }, 10);
                //    } else if (event.deltaY < 0) {
                //        $("#scrollArea").animate({ scrollLeft: '+=' + event.deltaX }, 10);
                //    }
                //    $('#scrollArea').scrollLeft();
                //    event.preventDefault();
                //});
                var prioritylogic = function () {                     //$timeout == OnWindowLoaded. because after changed priority, ParentHeight was not defined
                    parent = element;
                    parent.ready(function () {
                        var i = 0;
                        var test = element[0].offsetHeight;
                        i++;
                    });
                    settings.ParentHeight = element[0].offsetHeight - settings.ParentHeightCorrection;
                    //$scope.tempPageText = "";
                    //tempPageText = $scope.tempPageText;
                    //$scope.$watch('pagination-text', function (value) {
                    scope.$watch('paginationText', function (value) {
                        //fullScreenFunction(fullElement, value);
                        var i = 0;
                        i++;
                        if (typeof value !== "string") {
                            return;
                        }

                        paginate(value.split(' '));

                        //$scope.pagesLoaded(settings);
                        //scope.pagesLoaded({ payload: settings });
                        scope.pagesLoaded(settings);
                    });
                };
                prioritylogic();
                //$timeout(prioritylogic, 0);
            },
        }
    };

    app.register.directive('pagination1', pagination);
});



    //var PageModel = {
    //    Text: "",
    //    EstimatedHight: 0,
    //    Append: function (textChunck) {
    //        Text.append(textChunck).append(settings.PageSmallestUnit);
    //        EstimatedHight = settings.LineHight;
    //    },
    //    CreateElement: function () {
    //        var domPage = angular.element(settings.PageTemplate);
    //        domPage.text(Text);
    //        return domPage;
    //    }
    //};
    //// create fake
    //settings.ContentBox = angular.element('<article class="contentBox" />');
    //this.initialize = function (options) {
    //    angular.extend(settings, optioins);
    //    createFakeParent();
    //    paginate();
    //};


    //this.createFakeParent = function () {

    //    document.body.appendChild(e);
    //    var s = { client: { w: e.clientWidth, h: e.clientHeight }, offset: { w: e.offsetWidth, h: e.offsetHeight }, scroll: { w: e.scrollWidth, h: e.scrollHeight } };
    //    document.body.removeChild(e);
    //    return s;
    //};

    //https://stackoverflow.com/questions/12202324/split-text-into-pages-and-present-separately-html5
    //tempMeasure = function ()
    //{
    //    var contentBox = document.getElementById("ghost");
    //    var lineHeight = contentBox.style.lineHeight;
    //    var computedStyle = document.defaultView.getComputedStyle(contentBox, null);
    //    var paddingLeft = computedStyle.getPropertyValue('padding-left');
    //    var paddingRight = computedStyle.getPropertyValue('padding-right');
    //    var padding = parseInt(paddingLeft, 10) + parseInt(paddingRight, 10);
    //    var lineHeight1 = document.defaultView.getComputedStyle(contentBox, null).getPropertyValue("lineHeight");
    //    var heightWithPadding = contentBox.offsetHeight;
    //    var padding1 = contentBox.style.paddingTop + contentBox.style.paddingBottom;
    //    var lineHeight2 = heightWithPadding - padding;
    //    var angularElement = angular.element(contentBox);

    //    //var lineheight = angularElement[0].offsetHeight;
    //    ////var lineheight1 = angularElement.innerHeight;
    //    ////var lineheight2 = angularElement.outerHeight;

    //    //angularElement.remove();


    //    //var angularElement = angular.element('#ghost');
    //    //var hight = angularElement.height();
    //    //var hight1 = angularElement[0].offset‌​Height;
    //    var el = angularElement[0];
    //    var hight2 = angularElement.prop('offsetHeight');
    //    var hight3 = angularElement.prop('clientHeight');
    //}



    //this.paginate = function () {
    //    var splittedText = settings.Text.split(settings.PageSmallestUnit);
    //    //var newPage = angular.element(settings.PageTemplate);
    //    //settings.ContentBox.empty().append(newPage);
    //    var textChunck = "";
    //    //append(newPage, splittedText[0]);
    //    //settings.LineHight = newPage.height();
    //    var pageModel = new PageModel();
    //    for (var i = 0; i < splittedText.length; i++) {
    //        //textChunk.append(settings.PageSmallestUnit).append(splittedText[i]);
    //        //newPage.text(textChunk);

    //        if (pageModel.Height + setting.LineHight <= settings.Height) {
    //            pageModel.Append(textChunk);
    //        }
    //        else {
    //            var newPage = pageModel.CreateElement();
    //            Pages.push(newPage);
    //            pageModel = new PageModel();
    //        }
    //    }
    //};

    //this.paginate1 = function () {
    //};
//angular.module('mainModule').directive('pagination',



/*
Plan:
in directive I use tamplate 1 time. may be from compile: or by link:
add words to template
when size is too big, clear text and add page model
make somechildren invisible

Plan 2:
Do not do any ng-repeat
1 article controlle...

...no, I may want to show 2 pages on screen. 

 var contentBox = $('#target');
    //get the text as an array of word-like things
    var words = contentBox.text().split(' ');

    function paginate() {
        //create a div to build the pages in
        var newPage = $('<div class="individualPage" />');
        contentBox.empty().append(newPage);

        //start off with no page text
        var pageText = null;
        for(var i = 0; i < words.length; i++) {
            //add the next word to the pageText
            var betterPageText = pageText ? pageText + ' ' + words[i]
                                          : words[i];
            newPage.text(betterPageText);

            //Check if the page is too long
            if(newPage.height() > $(window).height()) {
                //revert the text
                newPage.text(pageText);

                //and insert a copy of the page at the start of the document
                newPage.clone().insertBefore(newPage);

                //start a new page
                pageText = null;
            } else {
                //this longer text still fits
                pageText = betterPageText;
            }
        }
    }

    $(window).resize(paginate).resize();
*/

/*future optimizations: 
render div as is with full text, then add viewports

|       |
|       |
|       |
|       |
|       |
|       |

*/

