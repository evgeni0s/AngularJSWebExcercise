define(['application-configuration'], function (app) {

    var bookPageController = function ($scope, $rootScope, $routeParams, $compile,
        $sce, $location, $anchorScroll, layoutParametersService, librarySearchService) {

        //$scope.initializeController = function (applicationModule) {

        //here I should have access to parent scope if bookReader will have variables as objects $scope.answer = {};
        // then here I will have $scope.answer.
        $scope.initializeController = function (pageModel) {

            $rootScope.applicationModule = "Library";
            $scope.HightlightModel = {
                SearchQuery: layoutParametersService.SearchQuery,
                PageNumber: pageModel.PageNumber,
                createNewSearchResult: librarySearchService.getSearchResultTemplate,
            }; 
        };



    };
    //app.register.directive("bookPageController", function () { });
    app.register.controller('bookPageController', ['$scope', '$rootScope', '$routeParams',
        '$compile', '$sce', '$location', '$anchorScroll', 'layoutParametersService', 'librarySearchService',
         bookPageController]);

});