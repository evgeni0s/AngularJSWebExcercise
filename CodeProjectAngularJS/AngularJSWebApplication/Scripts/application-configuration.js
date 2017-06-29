"use strict";
//original
define(['angularAMD', 'angular-route', 'ui-bootstrap', 'angular-sanitize', 'blockUI', ], function (angularAMD) {
//define(['jquery','angularAMD', 'angular-route', 'ui-bootstrap', 'angular-sanitize', 'blockUI', ], function ($,angularAMD) {
    var app = angular.module("mainModule", ['ngRoute', 'blockUI', 'ngSanitize', 'ui.bootstrap']);
   
    app.filter("leadingZeroes", function () {
        return function (data) {
            var pad = "000" + data;
            pad = pad.substr(pad.length - 3);
            return pad;
        }
    });

    //var fullScreenFunction = function (element, value) {
    //    if (element.requestFullscreen) {
    //        if (value) { element.requestFullscreen(); }
    //        else { document.exitFullscreen(); }
    //    } else if (element.webkitRequestFullscreen) {
    //        if (value) { element.webkitRequestFullscreen(); }
    //        else { document.webkitExitFullscreen(); }
    //    } else if (element.mozRequestFullScreen) {
    //        if (value) { element.mozRequestFullScreen(); }
    //        else { document.mozCancelFullScreen(); }
    //    } else if (element.msRequestFullscreen) {
    //        if (value) { element.msRequestFullscreen(); }
    //         else { msExitFullscreen(); }
    //    } else {
    //        console.log('Fullscreen API is not supported.');
    //    }
    //};

    //works without scope
    //var fullScreenDirective = function () {
    //    return {
    //        link: function ($scope, element, attrs) {
    //            //DOM manipulation
    //            var ang_element = angular.element(element);
    //            var fullElement = ang_element[0];
    //            $scope.$watch(attrs.fullscreen, function (value) {
    //                if (value)
    //                {
    //                    //var fullElement = angular.element(element);
    //                    //var fullElement = document.querySelector(scope.target);
                        
    //                    fullScreenFunction(fullElement);
    //                }
    //            });
    //        }
    //    }
    //};
    //var fullScreenDirective = function () {
    //    return {
    //        scope: {
    //            //target: '@fullscreen',
    //            //target1: '=fullscreen',
    //            //isFullscreen: '=?',
    //            //onChange: '&'
    //            //fullscreen: '=fullscreen',  //this adds object  TRUE FALSE ----works!!!
    //            fullscreen: '=',
    //        },
    //        //require: '?ngModel',
    //        link: function ($scope, element, attrs, ngModel) {
    //            //DOM manipulation
    //            var ang_element = angular.element(element);
    //            var fullElement = ang_element[0];
    //            $scope.$watch('fullscreen', function (value) {
    //                //if (value) {
    //                    //var fullElement = angular.element(element);
    //                    //var fullElement = document.querySelector(scope.target);

    //                    fullScreenFunction(fullElement, value);
    //                //}
    //            });

    //            //angular.copy(source, target)
    //            //$scope.$on('fullscreenchange', function (event, data)
    //            //document.addEventListener("fullscreenchange", function (event) 
    //            //fullElement.bind('fullscreenchange', function (event, data)

                 
    //            var onChange = function (e) {
    //                scope.fullscreen = !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
    //            };

    //            angular.forEach(['', 'moz', 'webkit', 'ms'], function (prefix) {
    //                //document.bind(prefix + 'fullscreenchange', onChange);   does not work
    //                //scope.onChange({ fullscreen: scope.isFullscreen });   does not work
    //                document.addEventListener(prefix + 'fullscreenchange', onChange); //WORKS!
    //            });

    //        }
    //    }
    //};

    //http://embed.plnkr.co/f6g6nj/
    //var fullScreenDirective = function () {
    //    return {
    //        scope: {
    //            target: '@fullscreen',
    //            target1: '=fullscreen',
    //            isFullscreen: '=?',
    //            onChange: '&'
    //        },
    //        link: function (scope, element, attrs) {
    //            //DOM manipulation
    //            scope.$watch(attrs.fullscreen, function (value) {
    //                if (value)
    //                {
    //                    //var fullElement = angular.element(element);

    //                    //document.querySelectorAll('[property]');
    //                    var fullElement = document.querySelector(scope.target);
    //                    fullScreenFunction(fullElement);
    //                }
    //            });
    //        }
    //    }
    //};

    //var fullScreenDirective = function () {
    //    return {
    //        scope: {
    //            target: '@fullscreen',
    //            target1: '=fullscreen',
    //        },
    //        link: function (scope, element, attrs) {
    //            //DOM manipulation
    //            scope.$watch(attrs.fullscreen, function (value) {
    //                if (value)
    //                {
    //                    //var fullElement = angular.element(element);

    //                    //document.querySelectorAll('[property]');
    //                    var fullElement = document.querySelector(scope.target);
    //                    fullScreenFunction(fullElement);
    //                }
    //            });
    //        }
    //    }
    //};
    //var jqueryDir = './Scripts/jquery-3.1.1';
    //var jqueryMod = require([jqueryDir]);

    var frameworks = ["./Scripts/jquery-3.1.1.js",
        "./Scripts/jquery-ui-1.12.1.js"];
    frameworks.forEach(function (entery) {
        require([entery]);
    });

    //app.directive("fullscreen", fullScreenDirective);
    var directives = ["./Directives/fullscreen.js",
        "./Directives/pagination1.js",
        "./Directives/horizontalscroll.js",
        "./Directives/isVisibleAware.js",
        "./Directives/anchorScroll1.js",
        "./Directives/horizontalAnchorScroll.js"];
    directives.forEach(function (entery) {
        require([entery]);
    });
    

    try {
        //var pageControllerDir = './Views/Library/BookPageController.js';
        //var pageControllerMod = require([pageControllerDir]);

        var controllers = ["./Views/Library/BookPageController.js",
            "./Views/Library/BookReaderToolPanelController.js"];
        controllers.forEach(function (entery) {
            require([entery]);
        });

    } catch (e) {
        console.log(e);
        throw e; // intentionally re-throw (caught by window.onerror)
    }
    app.config(function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.withCredentials = true;
    });

    app.config(function (blockUIConfigProvider) {

        // Change the default overlay message
        blockUIConfigProvider.message("executing...");
        // Change the default delay to 100ms before the blocking is visible
        blockUIConfigProvider.delay(1);
        // Disable automatically blocking of the user interface
        blockUIConfigProvider.autoBlock(false);

    });
    var errorPath = function (route, path, search) {
        return "/";
    };


    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
   
        $locationProvider.hashPrefix('');

        $routeProvider

           .when("/", angularAMD.route({
                         
                templateUrl: function (rp) {  return 'Views/Main/default.html';  },               
                controllerUrl: "Views/Main/defaultController"

            }))

            .when("/:section/:tree", angularAMD.route({

                templateUrl: function (rp) { return 'views/' + rp.section + '/' + rp.tree + '.html'; },

                resolve: {

                    load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {

                        var path = $location.path();
                        var parsePath = path.split("/");
                        var parentPath = parsePath[1];
                        var controllerName = parsePath[2];

                        var loadController = "Views/" + parentPath + "/" + controllerName + "Controller";                 

                        var deferred = $q.defer();
                        require([loadController], function () {
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });
                        return deferred.promise;
                    }]
                }

            }))

            .when("/:section/:tree/:id", angularAMD.route({

                templateUrl: function (rp) { return 'views/' + rp.section + '/' + rp.tree + '.html'; },

                resolve: {

                    load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {

                        var path = $location.path();
                        var parsePath = path.split("/");
                        var parentPath = parsePath[1];
                        var controllerName = parsePath[2];

                        var loadController = "Views/" + parentPath + "/" + controllerName + "Controller";
                                             
                        var deferred = $q.defer();
                        require([loadController], function () {
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });
                        return deferred.promise;
                    }]
                }

            }))


            .otherwise({
                //redirectTo: '/'
                redirectTo: errorPath
            }) 


    }]);


    var indexController = function ($scope, $rootScope, $http, $location, blockUI) {
             
        $scope.$on('$routeChangeStart', function (scope, next, current) {
             
            if ($rootScope.IsloggedIn===true)
            {               
                $scope.authenicateUser($location.path(),$scope.authenicateUserComplete, $scope.authenicateUserError);
            }
         
        });

        $scope.$on('$routeChangeSuccess', function (scope, next, current) {
         
            
         

        });

        //$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        //$rootScope.$on("$stateChangeError", function(event, current, previous, rejection) {
        //    if (error && !error.authenticated) {
        //        //$location.path("/login");
        //    }
        //});
        $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
            if (error && !error.authenticated) {
                //$location.path("/login");
            }
        });

        $scope.initializeController = function () {
            $rootScope.displayContent = false;
            if ($location.path() !== "")        
            {                      
                $scope.initializeApplication($scope.initializeApplicationComplete, $scope.initializeApplicationError);
            }
        }

        $scope.initializeApplicationComplete = function (response) {
            $rootScope.MenuItems = response.MenuItems;
            $rootScope.displayContent = true;
            $rootScope.IsloggedIn = true;          
        }

        $scope.initializeApplication = function (successFunction, errorFunction) {
            blockUI.start();           
            $scope.AjaxGet("/api/main/InitializeApplication", successFunction, errorFunction);
            blockUI.stop();
        };
              
        $scope.authenicateUser = function (route, successFunction, errorFunction) {
            var authenication = new Object();
            authenication.route = route;
            $scope.AjaxGetWithData(authenication, "/api/main/AuthenicateUser", successFunction, errorFunction);
        };
           
        $scope.authenicateUserComplete = function (response) {
           
            if (response.IsAuthenicated === false)               
                window.location = "/index.html";
        }

        $scope.authenicateUserError = function (response) {
            alert("ERROR= "+response.IsAuthenicated);
        }

        $scope.AjaxGet = function (route, successFunction, errorFunction) {         
            setTimeout(function () {
                $http({ method: 'GET', url: route }).then(
                    function (response) {                 
                        successFunction(response.data, response.status);
                },
                    function (response) {                  
                    errorFunction(response);
                });
            }, 1);

        }   

        $scope.AjaxGetWithData = function (data, route, successFunction, errorFunction) {
            setTimeout(function () {
                $http({ method: 'GET', url: route, params: data }).then(function (response) {
                    successFunction(response.data, response.status);
                },function (response) {
                    errorFunction(response);
                });
            }, 1);

        }

    };

    indexController.$inject = ['$scope', '$rootScope', '$http', '$location', 'blockUI'];
    app.controller("indexController", indexController);

    // Bootstrap Angular when DOM is ready
    angularAMD.bootstrap(app);

  
    return app;
});


