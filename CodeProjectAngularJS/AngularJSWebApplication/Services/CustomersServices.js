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

    app.register.service('customersService', ['ajaxService', function (ajaxService) {

        this.importCustomers = function (successFunction, errorFunction) {
            ajaxService.AjaxGet("/api/customers/ImportCustomers", successFunction, errorFunction);
        };

        this.getCustomers = function (customer, successFunction, errorFunction) {         
            /*AjaxGetWithData is declared inside application-configuration*/
            ajaxService.AjaxGetWithData(customer, "/api/customers/GetCustomers", successFunction, errorFunction);

        };

        this.createCustomer = function (customer, successFunction, errorFunction) {
            ajaxService.AjaxPost(customer, "/api/customers/CreateCustomer", successFunction, errorFunction);
        };

        this.updateCustomer = function (customer, successFunction, errorFunction) {
            ajaxService.AjaxPost(customer, "/api/customers/UpdateCustomer", successFunction, errorFunction);
        };
     
        this.getCustomer = function (customerID, successFunction, errorFunction) {
            ajaxService.AjaxGetWithData(customerID, "/api/customers/GetCustomer", successFunction, errorFunction);
        };

    }]);
});