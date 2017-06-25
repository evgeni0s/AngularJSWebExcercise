﻿"use strict";

define(['application-configuration', 'customersService', 'alertsService'], function (app) {

    app.register.controller('importCustomersController', ['$scope', '$rootScope', 'customersService', 'alertsService', function ($scope, $rootScope, customersService, alertsService) {

        $rootScope.closeAlert = alertsService.closeAlert;

        $scope.initializeController = function () {
            /*this goes to master page*/
            //ng - repeat="menuItem in MenuItems | filter:{Module: applicationModule}"
            $rootScope.applicationModule = "Customers";
        }

        $scope.importCustomers = function () {           
            customersService.importCustomers($scope.importCustomersCompleted, $scope.importCustomersError);
        }

        $scope.importCustomersCompleted = function (response) {
            alertsService.RenderSuccessMessage(response.ReturnMessage);
        }

        $scope.importCustomersError = function (response) {
            alertsService.RenderErrorMessage(response.ReturnMessage);
        }

    }]);
});
