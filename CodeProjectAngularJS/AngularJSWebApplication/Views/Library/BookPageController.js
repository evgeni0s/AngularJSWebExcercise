﻿define(['application-configuration'], function (app) {

    var bookPageController = function ($scope, $rootScope, $routeParams, $compile, $sce) {

        //$scope.initializeController = function (applicationModule) {

        //here I should have access to parent scope if bookReader will have variables as objects $scope.answer = {};
        // then here I will have $scope.answer.
        $scope.initializeController = function (pageModel) {

            $rootScope.applicationModule = "Library";
            //$scope.Text = text;
        };



    };
    //app.register.directive("bookPageController", function () { });
    app.register.controller('bookPageController', ['$scope', '$rootScope', '$routeParams',
        '$compile', '$sce', bookPageController]);

});