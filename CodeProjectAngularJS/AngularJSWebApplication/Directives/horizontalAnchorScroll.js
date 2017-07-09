define(['application-configuration'], function (app) {
    // works, but scrolls down
    var isVisibleAwareDirective = function ($anchorScroll, $location) {
        $anchorScroll.yOffset = 50;
        var previousAnimationsStillRunning = false;
        var parent = null;
        var accumulatedScrollCalls = 0;

        //var parentRectangle = function () {
        //    var rect = parent.getBoundingClientRect();
        //    return {
        //        top: rect.top,
        //        left: rect.left,
        //        bottom: rect.bottom,
        //        right: rect.right,
        //    }
        //};
        var parentRectangle = null;

        var anchorElement = function (id) {
            var anchorId = '#' + 'anchor' + id;
            var ele = angular.element(anchorId);
            return ele;
        };
        var anchorId = function (id) {
            var ai = '#anchor' + id;
            return ai;
        };

        //var isElementInViewport = function (el) {

        //    //special bonus for those using jQuery
        //    if (typeof jQuery === "function" && el instanceof jQuery) {
        //        el = el[0];
        //    }

        //    var rect = el.getBoundingClientRect();

        //    return (
        //        rect.top >= 0 &&
        //        rect.left >= 0 &&
        //        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        //        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        //    );
        //};

        //var isElementInParent = function (el) {
        //    //special bonus for those using jQuery
        //    if (typeof jQuery === "function" && el instanceof jQuery) {
        //        el = el[0];
        //    }

        //    var rect = el.getBoundingClientRect();

        //    return (
        //        rect.top >= parentRectangle.top &&
        //        rect.left >= parentRectangle.left &&
        //        rect.bottom <= parentRectangle.bottom &&
        //        rect.right <= parentRectangle.right
        //    );
        //}

        var calculateDelta = function (el) {
            //special bonus for those using jQuery
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }

            var rect = el.getBoundingClientRect();

            //Math.sqrt(Math.pow(parentRectangle.left, 2) + Math.pow(parentRectangle.left, 2))
            var nessesaryDelta = 0;
            if (rect.left < parentRectangle.left) {
                nessesaryDelta = parentRectangle.left - rect.left;
            }
            else if (rect.right > parentRectangle.right) {
                nessesaryDelta = rect.right - parentRectangle.right;
            }
            return nessesaryDelta;
        };

        var calculateDeltaWithAccumulatedCalls = function (el) {
            var delta = calculateDelta(el);
            if (accumulatedScrollCalls === 0) {
                //console.log("No accumulatedScrollCalls");
                return delta;
            }
            var deltaFactor = delta * accumulatedScrollCalls;

            //console.log("Accumulated: calls = " + accumulatedScrollCalls + " delta = " + delta + " deltaFactor = " + deltaFactor);
            accumulatedScrollCalls = 0;
            return deltaFactor;
        };

        var getAnumationPrefix = function (event) {
            var pref = '';
            if (event.deltaY > 0) {
                pref = '+=';
            }
            else if (event.deltaY < 0) {
                pref = '-=';
            }
            return pref;
        };

        var accumulateCall = function () {
            if (accumulatedScrollCalls < 4 && previousAnimationsStillRunning) {
                accumulatedScrollCalls++;
            }
        };


        return {
            scope: {
                nextId: '&',
                previousId: '&',
                scrollCompleated: '=',
            },
            link: function ($scope, element, attrs) {
                var animateScroll = function (animationValue) {
                    // consider momentum scroll here
                    $(parent).animate({ scrollLeft: animationValue }, 1, 'linear', function () {
                        previousAnimationsStillRunning = false;
                    });
                    // is this needed? works with offset raser then with delta
                    //$(parent).scrollLeft();
                };

                //element.bind("scroll DOMMouseScroll mousewheel onmousewheel", function (event) {
                element.bind("scroll DOMMouseScroll mousewheel onmousewheel", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (event.deltaY === 0 || typeof (event.deltaY) === 'undefined')
                    {
                        return;
                    }
                    //if (previousAnimationsStillRunning) {
                    //    //console.log("Call accumulated for");
                    //    //console.log("event.deltaY = " + event.deltaY + " event.deltaX = " + event.deltaX);
                    //    //console.log("From " + accumulatedScrollCalls);
                    //    accumulateCall();
                    //    //console.log("To " + accumulatedScrollCalls);
                    //    return;
                    //}

                    previousAnimationsStillRunning = true;
                    
                    if (!parent) {
                        parent = element[0];
                        parentRectangle = parent.getBoundingClientRect();
                    }
                    var id = null;
                    if (event.deltaY > 0) {
                        id = $scope.nextId();
                        console.log("Next >>>");
                    }
                    else /*if (event.deltaY < 0)*/ {
                        id = $scope.previousId();
                        console.log("Previous <<<");
                    }
                    console.log("event.deltaY = " + event.deltaY + " event.deltaX = " + event.deltaX);
                    var aid = anchorId(id);
                    console.log("name of elemet " + aid);
                    var ele = $(aid);
                    console.log("elemet itelf " + ele);
                    if (typeof(ele) !== 'object')
                    {
                        var i = 0;
                        i++;
                    }
                    var delta = calculateDelta(ele);
                    var prefix = getAnumationPrefix(event);
                    animateScroll(prefix + delta);
                    $scope.scrollCompleated(id);
                });
            }
        }
    };
    app.register.directive("horizontalAnchorScroll", ['$anchorScroll', '$location', isVisibleAwareDirective]);
});