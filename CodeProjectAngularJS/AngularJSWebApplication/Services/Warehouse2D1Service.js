define(['application-configuration'], function (app) {
    /*
    keeps items not in array, but in warehouseBaseService
     */
    var warehouseBaseService = {};
    var parent = this;
    /*
    2d warehouseBaseService:
    [parent][child]
    */
    function Warehouse2DService() {

        var keyWarehouse = warehouseBaseService.createNew();
        var items = keyWarehouse.Items;

        var CurrentKey = {};
        var CurrentValue = {};          
        var CurrentValueWarehouse = {};

        var totalItems = function () {
            return items.reduce(sumLength);
        };


        var goTo = function (keyIndex, valueindex) {
            
            CurrentKey = keyWarehouse.keyAt(keyIndex);
            CurrentValueWarehouse = keyWarehouse.elementAt(CurrentKey);
            CurrentValueWarehouse.goTo(valueindex);
            CurrentValue = CurrentValueWarehouse.Current;
        };


        // will load in circle. first iterates values, when reachs end
        // reserts them to zero and navigates to next key
        var goForward = function () {
            var keyIndex = nextKeyIndex();
            var valueIndex = nextValueIndex();
            goTo(keyIndex, valueIndex);
        };

        var goBackward = function () {
            var keyIndex = previousKeyIndex();
            var valueIndex = previousValueIndex();
            goTo(keyIndex, valueIndex);
        };
        
        var clear = function () {
            CurrentKey = {};
            CurrentValue = {};
            keyWarehouse.clear();
        };

        var add = function (key, value) {
            // create key if not exists
            if (!keyWarehouse.hasKey(key)) {
                keyWarehouse.add(key, warehouseBaseService.createNew());
            }

            var valueWarehouse = items[key];
            if (!valueWarehouse.hasValue(value))
            {
                valueWarehouse.add(value);
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
        
        //var hasNextValue = function () {
            //if (!items.hasOwnProperty(CurrentKey)) {
            //    return false;
            //}
            //return items[CurrentKey].indexOf(CurrentValue) < items[CurrentKey].length;

            //if (CurrentValueWarehouse.keyAt()
        //};

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
            
            goTo: goTo,
            goForward: goForward,
            goBackward: goBackward,
            clear: clear
        };

        //angular.extend(factoryApi, warehouse);

        return factoryApi;

    };
    var factoryApi = function (warehouseBaseService) {
        parent.warehouseBaseService = warehouseBaseService;
        return {
            createNew: function () {
                return new warehouse2D1Service();
            }
        };
    }
    app.register.factory('warehouse2D1Service', ['warehouseBaseService', factoryApi]);
});