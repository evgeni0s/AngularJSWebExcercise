"use strict";
define(['application-configuration', 'alertsService', 'dataGridService', 'booksService'], function (app) {

    app.register.controller('booksController', ['$scope', '$rootScope', 'alertsService', 'dataGridService', 'booksService',
        function ($scope, $rootScope, alertsService, dataGridService, booksService) {

            //$scope.initializeController = function (applicationModule) {
            $scope.initializeController = function () {

                //$rootScope.applicationModule = applicationModule;
                $rootScope.applicationModule = "Library";
                dataGridService.initializeTableHeaders();

                //header | sortExpression
                dataGridService.addHeader("Book #", "BookId");
                dataGridService.addHeader("Name", "Name");
                dataGridService.addHeader("Text", "Text");
                dataGridService.addHeader("Category", "Category");

                $scope.tableHeaders = dataGridService.setTableHeaders();
                //$scope.defaultSort = dataGridService.setDefaultSort("Order Date");

                $scope.changeSorting = function (column) {

                    dataGridService.changeSorting(column, $scope.defaultSort, $scope.tableHeaders);

                    $scope.defaultSort = dataGridService.getSort();
                    $scope.SortDirection = dataGridService.getSortDirection();
                    $scope.SortExpression = dataGridService.getSortExpression();
                    $scope.CurrentPageNumber = 1;

                    $scope.getBooks();

                };


                //$scope.setSortIndicator = function (column) {
                    //return dataGridService.setSortIndicator(column, $scope.defaultSort);
                //};

                $scope.CustomerCode = "";
                $scope.CompanyName = "";

                $scope.PageSize = 15;
                $scope.SortDirection = "DESC";
                //$scope.SortExpression = "OrderDate";
                $scope.CurrentPageNumber = 1;

                $rootScope.closeAlert = dataGridService.closeAlert;

                $scope.books = [];

                $scope.getBooks();

            }

            $scope.booksInquiryCompleted = function (response, status) {

                alertsService.RenderSuccessMessage(response.ReturnMessage);
                $scope.books = response.Books;
                $scope.TotalRows = response.TotalRows;
                $scope.TotalPages = response.TotalPages;
            }

            $scope.searchBooks = function () {
                $scope.CurrentPageNumber = 1;
                $scope.getBooks();
            }

            $scope.pageChanged = function () {
                $scope.getBooks();
            }

            $scope.getBooks = function () {
                //var orderInquiry = $scope.createOrderInquiryObject();
                booksService.getBooks($scope.booksInquiryCompleted, $scope.booksInquiryError);
            }

            $scope.booksInquiryError = function (response, status) {
                if (response.IsAuthenicated == false) {
                    window.location = "/index.html";
                }
                alertsService.RenderErrorMessage(response.ReturnMessage);
            }

            $scope.resetSearchFields = function () {
                //$scope.CustomerCode = "";
                //$scope.CompanyName = "";
                $scope.getBooks();
            }

            //$scope.createOrderInquiryObject = function () {

            //    var orderInquiry = new Object();

            //    orderInquiry.CustomerCode = $scope.CustomerCode;
            //    orderInquiry.CompanyName = $scope.CompanyName;
            //    orderInquiry.CurrentPageNumber = $scope.CurrentPageNumber;
            //    orderInquiry.SortExpression = $scope.SortExpression;
            //    orderInquiry.SortDirection = $scope.SortDirection;
            //    orderInquiry.PageSize = $scope.PageSize;

            //    return orderInquiry;
            //}


        }]);


});
/*this is common controller. 
each view can use it but should inherit own controller control*/
