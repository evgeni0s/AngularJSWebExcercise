"use strict";
define(['application-configuration', 'alertsService', 'dataGridService', 'booksService'], function (app) {/*'booksService',*/

    app.register.controller('bookDetailsController', ['$scope', '$rootScope', 'alertsService', 'dataGridService', 'booksService',/*'booksService', */
        function ($scope, $rootScope, alertsService, dataGridService, booksService) {
            $scope.initializeController = function () {

                $rootScope.applicationModule = "Library";
                $scope.book = [];
                $scope.getCategories();
            }

        }]);

});