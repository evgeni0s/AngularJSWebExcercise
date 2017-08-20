define(['application-configuration'], function (app) {

    var layoutParametersService = function ($rootScope)
    {
        //var self = this;
        var factory = {
            CurrentPage: '',
            SearchQuery: {
                Text: '',
                AllBooks: '',
            },
            CurrentLayout: {},  
            LayoutTypes: {
                SinglePage: 'Single Page',
                EnableScrolling : 'Enable Scrolling',
                TwoPages : 'Two Pages',
                TwoPageScrolling: 'Two Pages Scrolling',
            },
            //LayoutTypes: [
            //    { 'SinglePage': 'Single Page' },
            //    { 'EnableScrolling': 'Enable Scrolling' },
            //    { 'TwoPages': 'Two Pages' },
            //    { 'TwoPageScrolling': 'Two Pages Scrolling' },
            //],
            subscribeSearchQueryChanged: {}, 
            setSearchQueryText: {}, 
        };

        factory.CurrentLayout = 'TwoPages';

        /*<<<<<SearchQuery.Text*/
        factory.subscribeSearchQueryChanged = function (scope, callback) {
            var handler = $rootScope.$on('search-query-text-changed-event', callback);
            scope.$on('$destroy', handler);
        };

        factory.setSearchQueryText = function (value) {
            factory.SearchQuery.Text = value;
            $rootScope.$emit('search-query-text-changed-event');
        };
        /*SearchQuery.Text>>>>>>*/

        return factory;
        //factory[SinglePage] = 
    };
    app.register.factory('layoutParametersService', layoutParametersService);
});