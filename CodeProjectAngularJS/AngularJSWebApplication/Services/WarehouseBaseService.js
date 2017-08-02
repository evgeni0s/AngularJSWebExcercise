define(['application-configuration'], function (app) {

    function WarehouseBaseService() {

        var items = [];
        var Current = {};


        var totalItems = function () {
            return items.length;
        };

        var goTo = function (id) {
            Current = items[id];
        };

        var goForward = function () {
            var id = nextId();
            goTo(id);
        };

        var goBackward = function () {
            var id = previousId();
            goTo(id);
        };

        var nextId = function () {
            var currentIndex = items.indexOf(Current);
            var nextIndex = currentIndex + 1;

            return nextIndex < items.length ? nextIndex : currentIndex;
        };

        var previousId = function () {
            var currentIndex = items.indexOf(Current);
            var previousIndex = currentIndex - 1;
            return previousIndex > 0 ? previousIndex : currentIndex;
        };

        //var keyAt = function (index) {
        //    return items.slice(index, index + 1);
        //};

        //var elementAt = function (key) {
        //    if (!items.hasOwnProperty(key)) {
        //        return null;
        //    }
        //    return items[key];
        //};

        //var hasKey = function (key) {
        //    return items.hasOwnProperty(key);
        //};

        //var hasValue = function (value) {
        //    return items.includes(value);
        //};
        
        //var add = function (key, value) {
        //    items[key] = value;
        //};

        var clear = function () {
            Current = {};
            items.length = 0;
        };

        var factoryApi = {
            totalItems: totalItems,
            Items: items,
            Current: Current,
            goTo: goTo,
            goForward: goForward,
            goBackward: goBackward,
            nextId: nextId,
            previousId: previousId,
            //keyAt: keyAt,
            //elementAt: elementAt,
            //hasKey: hasKey,
            //hasValue: hasValue,
            //add: add,
            clear: clear
        };
        return factoryApi;

    };
    var factoryApi = function ()
    {
        return {
            createNew: function () {
                return new WarehouseBaseService();
            }
        };
    }
        //var factoryApi = {
        //    createNew: function () {
        //        return new WarehouseBaseService();
        //    }
        //};
    //app.register.factory('warehouseBaseService', factoryApi);
    //app.register.factory('warehouseBaseService', function () { return {}; });
        //app.register.factory('warehouseBaseService', function () { return factoryApi; });
    //app.register.factory('warehouseBaseService', function () { return new WarehouseBaseService(); });
    app.register.factory('warehouseBaseService', factoryApi);
});