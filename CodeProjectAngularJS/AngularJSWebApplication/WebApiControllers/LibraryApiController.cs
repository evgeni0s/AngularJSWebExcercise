using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

using AngularJSWebApplication.Filters;
using AngularJSWebApplication.WebApiModels;
using AngularJSWebApplication.Helpers;
using AngularJSDataModels;
using AngularJSApplicationService;
using AngularJSDataServiceInterface;
using AngularJSDataService;
using AngularJSWebApplication.Helpers;


namespace AngularJSWebApplication.WebApiControllers
{
    [RoutePrefix("api/library")]
    public class LibraryApiController : ApiController
    {
        ILibraryDataService libraryDataService;

        /// <summary>
        /// Constructor with Dependency Injection using Ninject
        /// </summary>
        /// <param name="dataService"></param>
        public LibraryApiController()
        {
            libraryDataService = new LibraryDataService();
        }

        [Route("GetBook")]
        [HttpGet]
        [WebApiAuthenication]
        [ValidateModelState]
        public HttpResponseMessage GetBook(HttpRequestMessage request, [FromUri] int bookId)
        {
            var webApiModel = new LibraryApiModel();
            var transaction = new TransactionalInformation();
            var libraryBusinessService = new LibraryBusinessService(libraryDataService);
            var book = libraryBusinessService.GetBook(bookId, out transaction);
            webApiModel.CopyData(transaction);
            webApiModel.IsAuthenicated = true;
            webApiModel.Book = book;
            return CreateResponse(webApiModel, transaction);
        }
        
        [Route("GetBooks")]
        [HttpGet]
        [WebApiAuthenication]
        [ValidateModelState]
        public HttpResponseMessage GetBooks(HttpRequestMessage request)
        {
            var webApiModel = new LibraryApiModel();
            var transaction = new TransactionalInformation();
            var libraryBusinessService = new LibraryBusinessService(libraryDataService);
            var books = libraryBusinessService.GetBooks(out transaction);
            webApiModel.CopyData(transaction);
            webApiModel.IsAuthenicated = true;
            webApiModel.Books = books;
            return CreateResponse(webApiModel, transaction);
        }

        [Route("CreateBook")]
        [WebApiAuthenication]
        [ValidateModelState]
        [HttpPost]
        public HttpResponseMessage CreateBook(HttpRequestMessage request, [FromBody] BookDTO bookDTO)
        {
            var webApiModel = new LibraryApiModel();
            var jsModel = bookDTO.Convert();
            var transaction = new TransactionalInformation();
            var libraryBusinessService = new LibraryBusinessService(libraryDataService);
            libraryBusinessService.CreateBook(jsModel, out transaction);

            webApiModel.CopyData(transaction);
            webApiModel.IsAuthenicated = true;
            webApiModel.Book = jsModel;
            return CreateResponse(webApiModel, transaction);
        }
        
        [Route("UpdateBook")]
        [WebApiAuthenication]
        [ValidateModelState]
        [HttpPost]
        public HttpResponseMessage UpdateBook(HttpRequestMessage request)
        {
            throw new NotImplementedException();
        }
        
        [Route("DeleteBook")]
        [WebApiAuthenication]
        [ValidateModelState]
        [HttpPost]
        public HttpResponseMessage DeleteBook(HttpRequestMessage request, [FromBody] int id)
        {
            throw new NotImplementedException();
        }
        
        [Route("GetCategories")]
        [HttpGet]
        [WebApiAuthenication]
        [ValidateModelState]
        public HttpResponseMessage GetCategories(HttpRequestMessage request)
        {
            var webApiModel = new LibraryApiModel();
            var transaction = new TransactionalInformation();
            var libraryBusinessService = new LibraryBusinessService(libraryDataService);
            var categories = libraryBusinessService.GetCategories(out transaction);
            webApiModel.CopyData(transaction);
            webApiModel.IsAuthenicated = true;
            webApiModel.Categories = categories;
            return CreateResponse(webApiModel, transaction);
        }

        private HttpResponseMessage CreateResponse(LibraryApiModel webApiModel, TransactionalInformation transaction)
        {
            if (transaction.ReturnStatus == true)
            {
                var response = Request.CreateResponse<LibraryApiModel>(HttpStatusCode.OK, webApiModel);
                return response;
            }

            var badResponse = Request.CreateResponse<LibraryApiModel>(HttpStatusCode.BadRequest, webApiModel);
            return badResponse;
        }
    }
}