define(['application-configuration'], function (app) {

    var layoutParametersService = function ()
    {
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
        };
        factory.CurrentLayout = 'TwoPages';
        return factory;
        //factory[SinglePage] = 
    };
    app.register.factory('layoutParametersService', layoutParametersService);
});