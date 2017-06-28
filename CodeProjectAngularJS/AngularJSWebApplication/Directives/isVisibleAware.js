
//not used, not finished
define(['application-configuration'], function (app, $window) {


    function isElementInViewport(el) {

        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }


    var isVisibleAwareDirective = function () {
        return {
            scope: {
                isVisibleOutput: '=',
            },
            link: function ($scope, element, attrs) {

                element.bind("scroll", function () {
                    var i = 0;
                    i++;
                });
                var handler = function (el)
                {
                    var isVisible = isElementInViewport(el);
                };
                element.bind('DOMContentLoaded load resize scroll', handler); 
            }
        }
    };
    app.register.directive("isVisibleAware", isVisibleAwareDirective);
});