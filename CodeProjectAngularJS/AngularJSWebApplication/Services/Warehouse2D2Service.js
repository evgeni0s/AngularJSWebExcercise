/*Continue with:
continue testing goForward and goBackward.
*/

define(['application-configuration'], function (app) {
    /*
    recurcive!!!
    items[
        { Key: '3234', Value: Warehouse2D2Service},
        { Key: '34', Value: Warehouse2D2Service},
        { Key: '1', Value: Warehouse2D2Service}
    ]

    Warehouse2D2Service has list of Warehouse2D2Service
    each contains set of methods
    .goToEnd()
    .goToStart()


    Who ever calls service, will create Warehouse2D2Service(isRoot -> true);
    nested Warehouses will have isRoot -> false
    */
    function Warehouse2D2Service(isRoot) {
        
        var items = []; 

        var Current = {};
        
        var totalItems = function () {
            if (is1D()) {
                return items.length;
            } else if (is2D()) {
                var accumulatedSum = items.reduce(function (total, current) {
                    return total + current.Value.totalItems();
                });
                return accumulatedSum;
            }
        };

        function KVP(key, value)
        {
            this.Key = key;
            this.Value = value;
        }

        
        var goTo = function (index) {
            var needRewindToStart = items.indexOf(Current) > index;
            var needRewindToEnd= items.indexOf(Current) < index;
            Current = elementAt(index);
            if (needRewindToStart) {
                goToStart();
            }
            if (needRewindToEnd) {
                goToEnd();
            }
        };

        var goToStart = function () {
            Current = items[0];
            if (is2D) {
                Current.Value.goToStart();
            }
        }

        var goToEnd = function () {
            Current = items[items.length - 1];
            if (is2D) {
                Current.Value.goToEnd();
            }
        }

        
        var goForward = function () {
            // move forward child
            if (is2D() && Current.Value.canGoForward()) {
                Current.Value.goForward();
            }
            // go forward self
            else if (canGoForward()) {
                var currentIndex = items.indexOf(Current);
                currentIndex++;
                Current = elementAt(currentIndex);
            }
            // start from beggining
            else if (isRoot) {
                goToStart();
            }
        };

        var goBackward = function () {
            // move back child
            if (is2D() && items[Current].canGoBackward()) {
                items[Current].goBackward();
            }
            // go back self
            else if (goBackward()) {
                var currentIndex = items.indexOf(Current);
                currentIndex--;
                Current = elementAt(currentIndex);
            }
            // go to end
            else if (isRoot) {
                //var lastElement = items[items.length - 1];
                //Current = lastElement;
                goToEnd();
            }
        };


        // result does not depend on 1d or 2d. Only on current item and items.count 
        var canGoForward = function ()
        {
            var currentIndex = items.indexOf(Current);
            return currentIndex + 1 < items.length;
        };

        var canGoBackward = function () {
            var currentIndex = items.indexOf(Current);
            return currentIndex - 1 > 0;
        };

        // Warehouse's core
        var add = function (key, value) {

            // 1d or 2d
            var kvp1 = findByKey(key);

            // create parent if not exists
            if (!kvp1) {
                if (value) {
                    // 2d element
                    kvp1 = new KVP(key, new Warehouse2D2Service());
                    items.push(kvp1);
                } else {
                    // 1d element
                    if (!findByKey(key));
                    {
                        items.push(key);
                    }
                    
                    // no children in such array
                    return;
                }
            }

            var childWarehouse1d = kvp1.Value;
            //recursive call to this same function, but in 1d mode
            childWarehouse1d.add(value)
        };

        var is1D = function ()
        {
            return items.length > 0 && !is2D();
        }

        var is2D = function ()
        {
            //return typeof (items[0]) === 'KVP';
            return items[0] && items[0].constructor && items[0].constructor.name;
        }

        var clear = function () {
            Current = {};
            items.length = 0;
        };

        //#region private helpers
        var elementAt = function (index) {
            return items.slice(index, index + 1);
        };

        var getCurrentValue = function ()
        {
            if (!Current)
            {
                return null;
            }

            if (is1D()) {
                return Current;
            } else if (is2D()) {
                return Cerrent.Value.getCurrentValue();
            }
        }

        var findByKey = function(key)
        {
            return items.find(function (kvp) {
                if (is2D()) {
                    // kvp is 2d
                    return kvp.Key === key
                }
                // kvp is 1d
                return kvp === key;
            });
        }
        //#endregion private helpers

        var factoryApi = {
            totalItems: totalItems,
            Items: items,
            Current: Current,
            CurrentValue: getCurrentValue,
            add: add,
            elementAt: elementAt,//??
            findByKey: findByKey,

            
            goTo: goTo,
            goToStart: goToStart,
            goToEnd: goToEnd,
            goForward: goForward,
            goBackward: goBackward,
            clear: clear
        };

        //angular.extend(factoryApi, warehouse);

        return factoryApi;

    };
    var factoryApi = function () {
        return {
            createNew: function () {
                return new Warehouse2D2Service(true);
            }
        };
    }
    app.register.factory('warehouse2D2Service', factoryApi);
});