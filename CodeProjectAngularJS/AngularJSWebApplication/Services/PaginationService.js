//https://stackoverflow.com/questions/12202324/split-text-into-pages-and-present-separately-html5

define(['application-configuration'], function (app) {
    
    app.register.factory('paginationService', [function () {

        var pages = [];
        var parentHight = 0;
        var Current = {};
        var next = function () {
            var currentIndex = pages.indexOf(Current);
            Current = pages[currentIndex + 1];
        };
        var previous = function () {
            var currentIndex = pages.indexOf(Current);
            Current = pages[currentIndex - 1];
        };
        
        //var PageObject =
        //    {
        //        Text: "",
        //        PageNumber: 0,
        //        IsVisible: true,
        //    };

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
        
        var paginationServiceApi = {
            appedTextParts: appedTextParts,
            Pages: pages,
            ParentHeight: 0,
            Next: next,
            Current: {},
            Previous: previous,
            //VisibleRange: 2,

        };

        return paginationServiceApi;
    }]);
});