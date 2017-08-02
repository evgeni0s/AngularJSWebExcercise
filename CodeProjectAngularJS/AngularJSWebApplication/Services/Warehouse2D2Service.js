/*Continue with:
need assosiative array
currently if I add 1 page with number 33, then length of array will be 33
https://www.w3schools.com/js/js_arrays.asp
*/

define(['application-configuration'], function (app) {
    /*
    recurcive:
    [parent][child]
    */
    function Warehouse2D2Service(isRoot) {
        
        var items = [];

        var Current = {};  // key. items[Current].Current - value

        var totalItems = function () {
            return items.reduce(sumLength);
        };


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
            //zipCodes.push({ 10006: 'New York, NY' });
            if (!Current || !Current.goToStart)
            {
                return;
            }
            items[Current].goToStart();
        }

        var goToEnd = function () {
            Current = items[items.length - 1];
            if (!Current || !Current.goToEnd) {
                return;
            }
            items[Current].goToEnd();
        }

        
        var goForward = function () {
            if (!items.hasOwnProperty(Current)) {
                return;
            }
            // move forward child
            if (items[Current].canGoForward()) {
                items[Current].goForward();
            }
            // go forward self
            else if (canGoForward()) {
                var currentIndex = items.indexOf(Current);
                currentIndex++;
                Current = elementAt(currentIndex);
            }
            // start from beggining
            else if (isRoot) {
                //Current = items[0];
                goToStart();
            }
        };

        var goBackward = function () {
            if (!items.hasOwnProperty(Current)) {
                return;
            }
            // move back child
            if (items[Current].canGoBackward()) {
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

        // parent asks if childe can go forward
        var canGoForward = function ()
        {
            if (!items.hasOwnProperty(Current)) {
                return false;
            }
            var currentIndex = items.indexOf(Current);
            return currentIndex + 1 < items.length;
        };

        var canGoBackward = function () {
            if (!items.hasOwnProperty(Current)) {
                return false;
            }
            var currentIndex = items.indexOf(Current);
            return currentIndex - 1 > 0;
        };


        var add = function (key, value) {
            // create parent if not exists
            if (!items.hasOwnProperty(key)) {
                items[key] = new Warehouse2D2Service();
            }

            // add child if not exists
            var children = items[key].Items;
            //if (!items[key].includes(value)) {
            //    items[key].push(value);
            //}

            if (children.indexOf(value) === -1) {
                children.push(value);
            }
        };

        var clear = function () {
            Current = {};
            items.length = 0;
        };

        var elementAt = function (index) {
            return items.slice(index, index + 1);
        };

        var getCurrentValue = function ()
        {
            if (!items.hasOwnProperty(Current)) {
                return null;
            }
            return items[Current].Current;
        }
        
        var factoryApi = {
            totalItems: totalItems,
            Items: items,
            Current: Current,
            CurrentValue: getCurrentValue,
            add: add,
            elementAt: elementAt,
            
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