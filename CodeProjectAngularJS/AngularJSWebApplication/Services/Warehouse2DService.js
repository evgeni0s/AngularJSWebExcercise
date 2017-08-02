define(['application-configuration'], function (app) {
    /*
    not tested. Should work without warehouseBaseService
     */
    var warehouseBaseService = {};
    /*
    2d array:
    [parent][child]
    */
    function Warehouse2DService() {

        var items = [];
        var CurrentKey = {};

        var CurrentValue = {};

        var totalItems = function () {
            return items.reduce(sumLength);
        };


        var goTo = function (keyIndex, valueindex) {

            CurrentKey = keyAt(keyIndex);
            CurrentValue = valueAt(CurrentKey, valueindex);
        };


        // will load in circle. first iterates values, when reachs end
        // reserts them to zero and navigates to next key
        var goForward = function () {
            var keyIndex = nextKeyIndex();
            var valueIndex = nextValueIndex();
            goTo(keyIndex, valueIndex);
        };

        var goBackward = function () {
            //var id = previousId();
            //goTo(id);
        };

        //var nextId = function () {
        //    //var currentIndex = items.indexOf(Current);
        //    //var nextIndex = currentIndex + 1;

        //    //return nextIndex < items.length ? nextIndex : currentIndex;

        //    var currentKeyIndex = items.indexOf(CurrentKey);
        //    //var nextIndex = currentIndex + 1;

        //};


        var previousId = function () {
            //var currentIndex = items.indexOf(Current);
            //var previousIndex = currentIndex - 1;
            //return previousIndex > 0 ? previousIndex : currentIndex;
        };

        var clear = function () {
            Current = {};
            items.length = 0;
        };

        var add = function (key, value) {
            // create parent if not exists
            if (!items.hasOwnProperty(key)) {
                items[key] = [];
            }

            // add chid if not exists
            if (!searchResults[key].includes(value)) {
                searchResults[key].push(value);
            }
        };

        // private methods

        var keyAt = function (keyIndex) {
            return items.slice(keyIndex, keyIndex + 1);
        };

        var valueAt = function (key, valueIndex) {
            return key.slice(valueIndex, valueIndex + 1);
        }

        var sumLength = function (first, second)
        {
            return first.length + second.length;
        };
        
        var hasNextValue = function () {
            if (!items.hasOwnProperty(CurrentKey)) {
                return false;
            }
            return items[CurrentKey].indexOf(CurrentValue) < items[CurrentKey].length;
        };

        var hasNextKey = function () {
            if (!items.hasOwnProperty(CurrentKey)) {
                return false;
            }
            return items.indexOf(CurrentKey) < items.length;
        };

        var hasPreviousValue = function () {
            if (!items.hasOwnProperty(CurrentKey)) {
                return false;
            }
            return items[CurrentKey].indexOf(CurrentValue) > 0;
        };

        var hasPreviousKey = function () {
            if (!items.hasOwnProperty(CurrentKey)) {
                return false;
            }
            return items.indexOf(CurrentKey) > 0;
        };

        var nextValueIndex = function () {
            if (hasNextValue()) {
                return items[CurrentKey].indexOf(CurrentValue) + 1;
            }
            return 0;
        };

        var nextKeyIndex = function () {

            if (hasNextValue()) {
                // value increments, but key stays
                return items.indexOf(CurrentKey);
            }
            else if (hasNextKey()) {
                // value will be 0, key incremens
                return items.indexOf(CurrentKey) + 1;
            }
            // starting point: key and value = 0
            return 0;
        };

        var previousValueIndex = function () {
            if (hasPreviousValue()) {
                return items[CurrentKey].indexOf(CurrentValue) - 1;
            }
            // last item in previous key
            var previousKeyIndex = previousKeyIndex();
            var previousKey = keyAt(previousKeyIndex);
            return previousKey.length - 1;
        };

        var previousKeyIndex = function () {

            if (hasPreviousValue()) {
                // value decrements, but key stays
                return items.indexOf(CurrentKey);
            }
            else if (hasPreviousKey()) {
                // value will be 0, key decremens
                return items.indexOf(CurrentKey) - 1;
            }
            // end point: key - last key and value - last value
            return items.length - 1;
        };

        //var parentApi = {

        //    addChild: addChild,
        //    Children: [],

        //};

        var factoryApi = {
            totalItems: totalItems,
            Items: items,
            CurrentKey: CurrentKey,
            CurrentValue: CurrentValue,
            add: add,
            
            //goTo: goTo,
            goForward: goForward,
            goBackward: goBackward,
            nextId: nextId,
            previousId: previousId,
            clear: clear
        };

        //angular.extend(factoryApi, warehouse);

        return factoryApi;

    };
    var factoryApi = function (warehouseBaseService) {
        warehouseBaseService
        return {
            createNew: function () {
                return new Warehouse2DService();
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
    app.register.factory('warehouse2DService', ['warehouseBaseService', factoryApi]);
});