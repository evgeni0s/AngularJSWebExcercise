define(['application-configuration', 'paginationService', 'layoutParametersService'], function (app) {

    var bookReaderToolPanelController = function ($scope, $rootScope, $routeParams,
        $compile, $sce, paginationService, layoutParametersService, librarySearchService) {

        //Object.defineProperty($scope, "CurrentPage", {

        //    get: function () {
        //        return paginationService.getCurrentPageNumber();
        //    },

        //    set: function (value) {
        //        paginationService.setCurrentPageNumber(value);
        //    }
        //});

        //$scope.initializeController = function (applicationModule) {

        //here I should have access to parent scope if bookReader will have variables as objects $scope.answer = {};
        // then here I will have $scope.answer.
        $scope.initializeController = function () {

            $rootScope.applicationModule = "Library";
            $scope.LayoutProvider = layoutParametersService;
            $scope.CurrentPage = paginationService.CurrentPageNumber;
            $scope.TotalPages = paginationService.getTotalPages();
            //$scope.Text = text;
            //$scope.CurrentPage = "5";
        };

        $scope.onSearch = function ()
        {
            librarySearchService.goForward();
        }

        Object.defineProperty($scope, "SearchQueryText", {
            get: function () {
                return layoutParametersService.SearchQuery.Text;
            },
            set: function (value) {
                layoutParametersService.setSearchQueryText(value);
            }
        });


        //$scope.onCurrentLayoutChanged = function ()
        //{
        //    var i = $scope.LayoutProvider.CurrentLayout === 'TwoPageScrolling';
        //    var converted = $scope.LayoutProvider.CurrentLayout.toString();
        //}


    };
    //app.register.directive("bookPageController", function () { });
    app.register.controller('bookReaderToolPanelController', ['$scope', '$rootScope', '$routeParams',
        '$compile', '$sce', 'paginationService', 'layoutParametersService','librarySearchService', bookReaderToolPanelController]);

});