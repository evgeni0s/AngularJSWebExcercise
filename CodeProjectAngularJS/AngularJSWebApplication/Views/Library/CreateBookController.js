"use strict";
define(['application-configuration', 'alertsService', 'booksService'], function (app) {/*'booksService',*/

    app.register.controller('createBookController', ['$scope', '$rootScope', 'alertsService', 'booksService',/*'booksService', */
        function ($scope, $rootScope, alertsService, booksService) {

            $scope.initializeController = function () {

                $rootScope.applicationModule = "Library";
                $scope.Name = "";
                $scope.Text = "";
                $scope.categories = [];
                $scope.selectedCategory = null;
                $scope.newCategory = [];
                $scope.getCategories();
            }

            $scope.onCategoriesPopulated = function (response, status) {

                alertsService.RenderSuccessMessage(response.ReturnMessage);
                $scope.categories = response.Categories;
            }

            $scope.getCategories = function () {
                booksService.getCategories($scope.onCategoriesPopulated, $scope.onCategoriesFailed);
            }

            $scope.onCategoriesFailed = function (response, status) {
                if (response.IsAuthenicated == false) {
                    window.location = "/index.html";
                }
                alertsService.RenderErrorMessage(response.ReturnMessage);
            }

            $scope.onSelectedCategoryChanged = function ()
            {

            }
            
            $scope.onCreateBook = function ()
            {
                var book = new Object();
                book.Name = $scope.Name;
                book.Text = $scope.Text;
                if ($scope.selectedCategory) {
                    book.CategoryId = $scope.selectedCategory.Id;
                }
                else
                {
                    var category = new Object();
                    category.Name = $scope.newCategory;
                    book.Category = category;
                }


                booksService.createBook(book, $scope.onCreateBookSuccess, $scope.onCreateBookFailed)
            }

            $scope.onCreateBookSuccess = function () {

            }

            $scope.onCreateBookFailed = function () {

            }

        }]);

});
/*this is common controller. 
each view can use it but should inherit own controller control*/
