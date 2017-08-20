define(['application-configuration'], function (app) {

    var bookPageController = function ($scope, $rootScope, $routeParams, $compile,
        $sce, $location, $anchorScroll, layoutParametersService, librarySearchService) {

        //$scope.initializeController = function (applicationModule) {

        //here I should have access to parent scope if bookReader will have variables as objects $scope.answer = {};
        // then here I will have $scope.answer.
        $scope.onHighlightComplete = function ()
        {
            librarySearchService.goToStart();
        }
        //
        //$scope.onHighlightStarted = function () {
        //    librarySearchService.clear();
        //}

        $scope.initializeController = function (pageModel) {

            $rootScope.applicationModule = "Library";
            $scope.HightlightModel = {
                // useing prototype inheritence, these below data are obtained from parent
                SearchQuery: $scope.HilightDirectiveData,
                //SearchQuery: layoutParametersService.SearchQuery,  Insted Parameters will come from parent and parent will controll them
                PageNumber: pageModel.PageNumber,
                createNewSearchResult: librarySearchService.getSearchResultTemplate,
                highlightComplete: $scope.onHighlightComplete,
                //highlightStarted: $scope.onHighlightStarted,
            }; 
        };



    };
    //app.register.directive("bookPageController", function () { });
    app.register.controller('bookPageController', ['$scope', '$rootScope', '$routeParams',
        '$compile', '$sce', '$location', '$anchorScroll', 'layoutParametersService', 'librarySearchService',
         bookPageController]);

});