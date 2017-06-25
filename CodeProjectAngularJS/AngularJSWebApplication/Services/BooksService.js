/*
#evgeni0s
define is RequireJS functionality for loading modules
http://artemdemo.me/blog/%D1%87%D1%82%D0%BE-%D1%82%D0%B0%D0%BA%D0%BE%D0%B5-requirejs-%D0%B8-%D1%87%D1%82%D0%BE-%D1%81-%D1%8D%D1%82%D0%B8%D0%BC-%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C/
 * id (optional) - unique id of the module (which is really just a path to the module)
 * dependencies (optional) - array of dependencies
 * factory (required) - return exported value of the module
 
define(id, dependencies, factory);


Here we create a module that depends on 2 other modules:
'application-configuration'
'ajaxService'

and factory is:
function (app)


result will be
<head>
  <!-- ...some tags... -->
  <script src="./CustomersService.js"></script>
  <script src="./application-configuration.js"></script>
  <script src="./ajaxService.js"></script>
</head>

Hell...

customersService                           collection of frequently used functions
    importCustomersController              VM for particular screen
    customerMaintenanceController          reuses customersController
    customersController                    base controller. sometimes is used by other controllers


*/

define(['application-configuration', 'ajaxService'], function (app) {

    app.register.service('booksService', ['ajaxService', function (ajaxService) {

        /*
        AjaxPost
        AjaxPostWithNoAuthenication
        AjaxGet
        AjaxGetWithData
        AjaxGetWithNoBlock
        */
        this.getBook = function (bookId, successFunction, errorFunction) {
            /*AjaxGetWithData is declared inside application-configuration*/
            ajaxService.AjaxGetWithData(bookId, "/api/library/GetBook", successFunction, errorFunction);

        };

        this.getBooks = function (successFunction, errorFunction) {
            ajaxService.AjaxGet("/api/library/GetBooks", successFunction, errorFunction);
        };

        this.createBook = function (book, successFunction, errorFunction) {
            ajaxService.AjaxPost(book, "/api/library/CreateBook", successFunction, errorFunction);
        };

        this.updateBook = function (bookId, successFunction, errorFunction) {
            ajaxService.AjaxPost(bookId, "/api/library/UpdateBook", successFunction, errorFunction);
        };

        this.deleteBook = function (bookId, successFunction, errorFunction) {
            ajaxService.AjaxPost(bookId, "/api/library/DeleteBook", successFunction, errorFunction);
        };

        this.getCategories = function (successFunction, errorFunction) {
            ajaxService.AjaxGet("/api/library/GetCategories", successFunction, errorFunction);
        };

    }]);
});