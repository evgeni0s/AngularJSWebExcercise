/// <reference path="Scripts/ui-bootstrap-tpls-0.11.0.js" />
/// <reference path="Scripts/ui-bootstrap-tpls-0.11.0.js" />
/// <reference path="Scripts/ui-bootstrap-tpls-0.11.0.js" />
//https://www.codeproject.com/Articles/808213/Developing-a-Large-Scale-Application-with-a-Single
require.config({

    baseUrl: "",

    // alias libraries paths
    paths: {
        'application-configuration': 'scripts/application-configuration',
        'jquery': 'scripts/jquery-3.1.1',
        'angular': 'scripts/angular',
        'angular-route': 'scripts/angular-route',
        'angularAMD': 'scripts/angularAMD',
        'ui-bootstrap' : 'scripts/ui-bootstrap-tpls-0.11.0',
        'blockUI': 'scripts/angular-block-ui',
        'ngload': 'scripts/ngload',       
        'mainService': 'services/mainServices',
        'ajaxService': 'services/ajaxServices',
        'alertsService': 'services/alertsServices',
        'accountsService': 'services/accountsServices',
        'customersService': 'services/customersServices',
        'ordersService': 'services/ordersServices',
        'productsService': 'services/productsServices',
        'dataGridService': 'services/dataGridService',
        'paginationService': 'services/paginationService',    
        'angular-sanitize': 'scripts/angular-sanitize',
        'booksService': 'services/booksService',
        'customersController': 'Views/Shared/CustomersController',
        'productLookupModalController': 'Views/Shared/ProductLookupModalController',
        //'booksController': 'Views/Shared/BooksController'
        'pagination':'Directives/pagination',
        'bookPageController': 'Views/Library/BookPageController',
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'blockUI': ['angular'],
        'angular-sanitize': ['angular'],
        'ui-bootstrap': ['angular']
         
    },

    // kick start application
    deps: ['application-configuration']
});
