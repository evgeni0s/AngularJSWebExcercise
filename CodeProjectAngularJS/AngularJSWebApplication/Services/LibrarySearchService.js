/*
Use of this service is that it creates new instance of warehouse.
Can achive this in directives
*/

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
            warehouse.add(pageNumber, searchResult);
        };



        var factoryApi = {
            getSearchResultTemplate: function () {
                return new SearchResult();
            }
        };
        factoryApi.saveOnPage = saveOnPage;

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
    };
    app.register.factory('librarySearchService', ['warehouse2D2Service', librarySearchService]);
});