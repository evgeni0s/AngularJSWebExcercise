define(['application-configuration'], function (app) {
    // works, but scrolls down
    var isVisibleAwareDirective = function ($anchorScroll, $location) {
        var scrollTo = function (x) {
            var newHash = 'anchor' + x;
            if ($location.hash() !== newHash) {
                $location.hash('anchor' + x);
                $anchorScroll();
            } else
            {
            }
        };
        
        //$anchorScroll.yOffset = 50;
        return {
            scope: {
                nextId: '&',
                previousId: '&',
                scrollCompleated: '=',
            },
            link: function ($scope, element, attrs) {

                element.bind("scroll DOMMouseScroll mousewheel onmousewheel", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var id = null;
                    if (event.deltaY > 0) {
                        id = $scope.nextId();
                    }
                    else if (event.deltaY < 0)
                    {
                        id = $scope.previousId();
                    }
                    if (id !== null)
                    {
                        scrollTo(id);
                        $scope.scrollCompleated(id);
                    }
                    //scrolTo(element.id)
                    //scrollTo('5');
                });
            }
        }
    };
    app.register.directive("anchorScroll1", ['$anchorScroll', '$location', isVisibleAwareDirective]);
});