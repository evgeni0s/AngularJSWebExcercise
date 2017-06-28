//https://stackoverflow.com/questions/12202324/split-text-into-pages-and-present-separately-html5

define(['application-configuration'], function (app) {
    
    app.register.factory('paginationService', [function () {

        var pages = [];
        var parentHight = 0;
        var Current = {};//this is a place where I will be grouping pages

        
        var totalPages = function () {
            return pages.length;
        };

        var goTo = function (id) {
            Current = pages[id];
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
            var currentIndex = pages.indexOf(Current);
            var nextIndex = currentIndex + 1;

            return nextIndex < pages.length ? nextIndex : currentIndex;
        };

        var previousId = function () {
            var currentIndex = pages.indexOf(Current);
            var previousIndex = currentIndex - 1;
            return previousIndex > 0 ? previousIndex : currentIndex;
        };
        
        var PageObject = function()
        {
            this.Text = "";
            this.PageNumber = 0;
            this.IsVisible = function () {
                //return Current === this; works, temp disabled
                return true;
            };
        };

        var appedTextParts = function (textArray, pHight) {
            for (i = 0; i < textArray.length; i++) {
                var newPage = new PageObject();
                newPage.Text = textArray[i];
                newPage.PageNumber = i + 1;
                pages[i] = newPage;
            }
            parentHight = pHight;
            Current = pages[0];
            
        };
        var getCurrentPageNumber = function () {
            return Current ? Current.PageNumber : 0;
        }

        var setCurrentPageNumber = function (value) {
            if (value < 0 || value >= pages.lengs)
            {
                return;
            }
            Current = pages[value - 1];
        };

        var paginationServiceApi = {
            Pages: pages,
            ParentHeight: 0,
            Current: {},
            //CurrentPageNumber: CurrentPageNumber,
            getCurrentPageNumber: getCurrentPageNumber,
            setCurrentPageNumber: setCurrentPageNumber,
            appedTextParts: appedTextParts,
            goForward: goForward,
            goBackward: goBackward,
            goTo: goTo,
            getNextId: nextId,
            getPreviousId: previousId,
            getTotalPages: totalPages,

            //VisibleRange: 2,

        };


        //Object.defineProperty(paginationServiceApi.prototype, "CurrentPageNumber", {

        //    get: function () {
        //        return Current.PageNumber;
        //    },

        //    set: function (value) {
        //        Current = pages[value];
        //    }
        //});
        //Object.defineProperty(this.prototype, "CurrentPageNumber", {

        //    get: function () {
        //        return Current.PageNumber;
        //    },

        //    set: function (value) {
        //        Current = pages[value];
        //    }
        //});

        //var k = CurrentPageNumber;

        return paginationServiceApi;
    }]);
});