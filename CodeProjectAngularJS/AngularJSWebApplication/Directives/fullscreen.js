define(['application-configuration'], function (app) {
//define(['mainModule'], function (app) {

    var fullScreenFunction = function (element, value) {
        if (element.requestFullscreen) {
            if (value) { element.requestFullscreen(); }
            else { document.exitFullscreen(); }
        } else if (element.webkitRequestFullscreen) {
            if (value) { element.webkitRequestFullscreen(); }
            else { document.webkitExitFullscreen(); }
        } else if (element.mozRequestFullScreen) {
            if (value) { element.mozRequestFullScreen(); }
            else { document.mozCancelFullScreen(); }
        } else if (element.msRequestFullscreen) {
            if (value) { element.msRequestFullscreen(); }
            else { msExitFullscreen(); }
        } else {
            console.log('Fullscreen API is not supported.');
        }
    };

    var fullScreenDirective = function () {
        return {
            scope: {
                fullscreen: '=',
            },
            link: function ($scope, element, attrs) {
                //DOM manipulation
                var ang_element = angular.element(element);
                var fullElement = ang_element[0];
                $scope.$watch('fullscreen', function (value) {
                    fullScreenFunction(fullElement, value);
                });
                var onChange = function (e) {
                    scope.fullscreen = !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
                };

                angular.forEach(['', 'moz', 'webkit', 'ms'], function (prefix) {
                    document.addEventListener(prefix + 'fullscreenchange', onChange);
                });

            }
        }
    };
    //app.directive("fullscreen", fullScreenDirective);
    app.register.directive("fullscreen", fullScreenDirective);
});