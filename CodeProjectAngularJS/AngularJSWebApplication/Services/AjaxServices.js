
define(['application-configuration'], function (app) {

    app.register.service('ajaxService', ['$http', 'blockUI', function ($http, blockUI) {

        // setting timeout of 1 second to simulate a busy server.



        this.AjaxPost = function (data, route, successFunction, errorFunction) {
            blockUI.start();
            //setTimeout(function () {
                $http.post(route, data).then(
                    function (response) {
                        blockUI.stop();
                        successFunction(response.data, response.status);
                    },
                    function (response) {
                        blockUI.stop();
                        if (response.IsAuthenicated === false) {
                            window.location = "/index.html";
                        }
                        errorFunction(response);
                    });
            //}, 1000);

        }

        this.AjaxPostWithNoAuthenication = function (data, route, successFunction, errorFunction) {
            blockUI.start();
            //setTimeout(function () {
                $http.post(route, data).then(
                    function (response) {
                        blockUI.stop();
                        successFunction(response.data, response.status);
                    },
                    function (response) {
                        blockUI.stop();
                        errorFunction(response);
                    });
            //}, 1000);

        }

        this.AjaxGet = function (route, successFunction, errorFunction) {
            blockUI.start();
            //setTimeout(function () {
                $http({ method: 'GET', url: route }).then(
                    function (response) {
                        blockUI.stop();
                        successFunction(response.data, response.status);
                },
                    function (response) {
                    blockUI.stop();
                    if (response.IsAuthenicated === false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            //}, 1000);

        }

        this.AjaxGetWithData = function (data, route, successFunction, errorFunction) {
            blockUI.start();
            //setTimeout(function () {
                $http({ method: 'GET', url: route, params: data }).then(
                    function (response) {
                        blockUI.stop();
                        successFunction(response.data, response.status);
                    },
                    function (response) {
                    blockUI.stop();
                    if (response.IsAuthenicated === false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            //}, 1000);

        }


        this.AjaxGetWithNoBlock = function (data, route, successFunction, errorFunction) {
            //setTimeout(function () {
                $http({ method: 'GET', url: route, params: data }).then(
                    function (response) {
                        successFunction(response.data, response.status);
                    },
                    function (response) {
                    if (response.IsAuthenicated === false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            //}, 0);

        }


    }]);
});


