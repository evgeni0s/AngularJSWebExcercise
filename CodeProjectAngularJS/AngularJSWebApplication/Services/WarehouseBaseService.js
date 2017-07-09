//define(['application-configuration'], function (app) {

//    var WarehouseBaseService = function () {

//        var warehouse = [];
//        var Current = {};


//        var totalItems = function () {
//            return warehouse.length;
//        };

//        var goTo = function (id) {
//            Current = warehouse[id];
//        };

//        var goForward = function () {
//            var id = nextId();
//            goTo(id);
//        };

//        var goBackward = function () {
//            var id = previousId();
//            goTo(id);
//        };

//        var nextId = function () {
//            var currentIndex = warehouse.indexOf(Current);
//            var nextIndex = currentIndex + 1;

//            return nextIndex < warehouse.length ? nextIndex : currentIndex;
//        };

//        var previousId = function () {
//            var currentIndex = warehouse.indexOf(Current);
//            var previousIndex = currentIndex - 1;
//            return previousIndex > 0 ? previousIndex : currentIndex;
//        };

//        var clear = function () {
//            Current = {};
//            warehouse.length = 0;
//        };

//    };
//    var factoryApi = {
//        createNew: function () {
//            return new WarehouseBaseService();
//        }
//    };
    
//    app.register.factory('warehouseBaseService', factoryApi);
//});