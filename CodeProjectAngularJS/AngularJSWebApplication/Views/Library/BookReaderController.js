"use strict";
define(['application-configuration', 'alertsService', 'booksService', 'paginationService'], function (app) {

    app.register.controller('bookReaderController', ['$scope', '$rootScope', '$routeParams', '$compile', '$sce', 'alertsService', 'booksService', 'paginationService',
        function ($scope, $rootScope, $routeParams, $compile, $sce, alertsService, booksService, paginationService) {

            //$scope.initializeController = function (applicationModule) {
            $scope.initializeController = function () {

                $rootScope.applicationModule = "Library";
                $scope.isFullScreen = false;

                $scope.BookId = ($routeParams.id || "");
                $scope.Name = "";
                $scope.Text = "";
                $scope.PagesModels = paginationService;
                //$scope.PagesModels.appedTextParts(["dummy text item"], 400);

                //$scope.Next = {};
                //$scope.Current = {};
                //$scope.Previous = {};
                //$scope.PagesModels = {
                //    //Pages: ["qwe","sds"],
                //};
                $scope.getBook();
            };
            
            $scope.getBook = function () {
                //var obj1 = { Name: "A Person", TelNo="12345" };  
                //var request = new { bookId : $scope.BookId };
                booksService.getBook({ bookId: $scope.BookId }, $scope.onGetBookSuccess, $scope.onGetBookFailed)
            }

            $scope.onGetBookSuccess = function (response, status) {
                alertsService.RenderSuccessMessage(response.ReturnMessage);
                $scope.Name = response.Book.Name;
                $scope.Text = response.Book.Text;
                //$scope.loadPages();
            };

            $scope.onGetBookFailed = function () {

            };

            $scope.TestItems = [1, 2, 3, 4, 5];
            $scope.onRefreshItems = function () {
                $scope.TestItems = 0;
                $scope.TestItems = [1, 2, 3, 4, 5, 6, 7, 8];
            };

            //Object.defineProperty($scope, "PagesModels", {
            //    get: function () {
            //        return paginationService.Pages;
            //    }
            //});

            //https://stackoverflow.com/questions/22427885/how-to-access-child-controller-scope-in-parent-controller-in-angular
            $scope.onPagesLoaded = function (payload) {
                paginationService.appedTextParts(payload.Pages, payload.ParentHeight);
                //$scope.PagesModels = payload;
                //angular.extend(settings, optioins);
            };

            $scope.loadPages = function () {
                //var textParent = document.getElementsByClassName("textParent");
                var textParent = document.getElementById("fullScreenTarget");
                //var linehight = contentBox.css('line-height');
                var angularTextParent = angular.element(textParent);
                var html = '<article class="textBox"></article>'
                //var ghost = angular.element();
                //ghost.text("test");
                var trustedHtml = $sce.trustAsHtml(html);
                var compiledHtml = $compile(trustedHtml)($scope);
                compiledHtml.text('mytext');
                angular.element(textParent).append(compiledHtml);
                $scope.$apply();
                //angularTextParent.add(ghost);
                var lineheight = compiledHtml.height;
                var lineheight1 = compiledHtml.innerHeight;
                var lineheight2 = compiledHtml.outerHeight;
                //angularTextParent.remove(ghost);
                //var linehight = contentBox.style.lineHeight;
                //var lineheight = angularElement.height;
                //var lineheight1 = angularElement.innerHeight;
                //var lineheight2 = angularElement.outerHeight;
                //paginationService.estimateLineHight(contentBox);
            }
            //This worked for me! I was trying to remove jQuery from my application, which was using angular.element('#header').height().
            //ou can do the same thing with angular.element(document.querySelector('#header'))[0].offset‌​Height.Thanks! –
            //element.prop('offsetHeight');
            //https://stackoverflow.com/questions/39891593/how-to-get-height-of-element-in-angularjs
            $scope.loadPages1 = function () {
                var contentBox = document.getElementById("ghost");
                var lineHeight = contentBox.style.lineHeight;
                var computedStyle = document.defaultView.getComputedStyle(contentBox, null);
                var paddingLeft = computedStyle.getPropertyValue('padding-left');
                var paddingRight = computedStyle.getPropertyValue('padding-right');
                var padding = parseInt(paddingLeft, 10) + parseInt(paddingRight, 10);
                var lineHeight1 = document.defaultView.getComputedStyle(contentBox, null).getPropertyValue("lineHeight");
                var heightWithPadding = contentBox.offsetHeight;
                var padding1 = contentBox.style.paddingTop + contentBox.style.paddingBottom; 
                var lineHeight2 = heightWithPadding - padding;
                var angularElement = angular.element(contentBox);

                //var lineheight = angularElement[0].offsetHeight;
                ////var lineheight1 = angularElement.innerHeight;
                ////var lineheight2 = angularElement.outerHeight;

                //angularElement.remove();


                //var angularElement = angular.element('#ghost');
                //var hight = angularElement.height();
                //var hight1 = angularElement[0].offset‌​Height;
                var el = angularElement[0];
                var hight2 = angularElement.prop('offsetHeight');
                var hight3 = angularElement.prop('clientHeight');
                //angularElement.remove();

            }
            //$scope.loadPages1 = function () {


            $scope.$watch('$viewContentLoaded', function () {
                //$scope.loadPages1();
            });
            

        }]);

});
/*this is common controller. 
each view can use it but should inherit own controller control*/
