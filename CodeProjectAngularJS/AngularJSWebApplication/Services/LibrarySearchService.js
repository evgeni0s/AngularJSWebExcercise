define(['application-configuration'], function (app) {

    var librarySearchService = function (warehouse2D2Service)
    {
        var searchResults = [];
        var currentSearchResult = {};
        // warehouse has some handy methods for working with collection
        var warehouse = warehouse2D2Service.createNew();
        searchResults = warehouse.Items;


        // Cretes an array of arras. Array of pages where eash item is array of search results
        var saveOnPage = function (pageNumber, searchResult) {
            //if (!searchResults.hasOwnProperty(pageNumber)){
            //    searchResults[pageNumber] = [];
            //}

            //if (!searchResults[pageNumber].includes(searchResult)) {
            //    searchResults[pageNumber].push(searchResult);
            //}
            warehouse.add(pageNumber, searchResult);
        };

        //var saveOnPage1 = function (pageNumber, searchResult)
        //{
        //    if (!warehouse.hasOwnProperty(pageNumber)) {
        //        searchResults[pageNumber] = [];
        //    }

        //    if (!searchResults[pageNumber].includes(searchResult)) {
        //        searchResults[pageNumber].push(searchResult);
        //    }
        //}

        //function isBiggerThan10(element, index, array) {
        //    return element > 10;
        //}
        //Object.defineProperty(this.prototype, "CurrentSearchResult", {

        //    get: function () {
        //        return currentSearchResult;
        //    },

        //    set: function (value) {
        //        currentSearchResult.isSelected = false;
        //        currentSearchResult = value;
        //        currentSearchResult.isSelected = true;
        //    }
        //});

        function SearchResult() {
            var self = this;
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
            this.height = 0;
            this.width = 0;
            this.isSelected = false;
            this.saveOnPage = function (pageNumber) {
                saveOnPage(pageNumber, self)
            };
        };

        var factoryApi = {
            getSearchResultTemplate: function () {
                return new SearchResult();
            },
        };

        // Opens access to goods from WarehouseBaseService
        /*
            totalItems
            Items
            Current
            goTo
            goForward
            goBackward
            nextId
            previousId
            clear
        */
        angular.extend(factoryApi, warehouse);

        return factoryApi;


        //var factory = {};
        //return factory;


        //angular.extend(ChildService.prototype, BaseService);
    };
    //app.register.factory('librarySearchService', ['warehouseBaseService', librarySearchService]);
    app.register.factory('librarySearchService', ['warehouse2D2Service', librarySearchService]);
});