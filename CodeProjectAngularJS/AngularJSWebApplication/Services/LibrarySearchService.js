define(['application-configuration'], function (app) {

    var librarySearchService = function ()
    {
        var searchResults = [];
        var currentSearchResult = {};
        var saveOnPage = function (pageNumber, searchResult) {
            if (!searchResults.hasOwnProperty(pageNumber)){
                searchResults[pageNumber] = [];
            }

            if (!searchResults[pageNumber].includes(searchResult)) {
                searchResults[pageNumber].push(searchResult);
            }
        };
        
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
        return factoryApi;


        //var factory = {};
        //return factory;


        //angular.extend(ChildService.prototype, BaseService);
    };
    app.register.factory('librarySearchService', librarySearchService);
});