using AngularJSDataModels;
using AngularJSDataServiceInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularJSApplicationService
{
    public class LibraryBusinessService
    {
        ILibraryDataService libraryDataService;
        public LibraryBusinessService(ILibraryDataService libraryDataService)
        {
            this.libraryDataService = libraryDataService;


            //HttpContext.Current.Request.Files
        }
        public void CreateBook(Book book, out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();
            try
            {
                libraryDataService.CreateSession();
                libraryDataService.BeginTransaction();
                libraryDataService.CreateBook(book);
                libraryDataService.CommitTransaction(true);
                transaction.ReturnStatus = true;
                transaction.ReturnMessage.Add("Book successfully created.");
            }
            catch (Exception ex)
            {
                transaction.ReturnMessage = new List<string>();
                string errorMessage = ex.Message;
                transaction.ReturnStatus = false;
                transaction.ReturnMessage.Add(errorMessage);
            }
            finally
            {
                libraryDataService.CloseSession();
            }
        }
        //not tested
        public void UpdateBook(Book book)
        {
            try
            {
                libraryDataService.CreateSession();
                var bookEntity = libraryDataService.GetBook(book.BookId);
                libraryDataService.BeginTransaction();

                bookEntity.CopyData(book);

                libraryDataService.CommitTransaction(true);
            }
            catch (Exception ex)
            {
                string errorMessage = ex.Message;
            }
            finally
            {
                libraryDataService.CloseSession();
            }
        }

        public List<Book> GetBooks(out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();
            var books = new List<Book>();
            try
            {
                libraryDataService.CreateSession();
                books = libraryDataService.GetBooks();
                transaction.ReturnStatus = true;
                transaction.ReturnMessage.Add("Book successfully retrieved.");
            }
            catch (Exception ex)
            {
                transaction.ReturnMessage = new List<string>();
                string errorMessage = ex.Message;
                transaction.ReturnStatus = false;
                transaction.ReturnMessage.Add(errorMessage);
            }
            finally
            {
                libraryDataService.CloseSession();
            }
            return books;
        }

        public Book GetBook(int id, out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();
            var book = new Book();
            try
            {
                libraryDataService.CreateSession();
                book = libraryDataService.GetBook(id);
                transaction.ReturnStatus = true;
                transaction.ReturnMessage.Add("Book found.");
            }
            catch (Exception ex)
            {
                transaction.ReturnMessage = new List<string>();
                string errorMessage = ex.Message;
                transaction.ReturnStatus = false;
                transaction.ReturnMessage.Add(errorMessage);
            }
            finally
            {
                libraryDataService.CloseSession();
            }
            return book;
        }

        public List<Category> GetCategories(out TransactionalInformation transaction)
        {
            transaction = new TransactionalInformation();
            var categories = new List<Category>();
            try
            {
                libraryDataService.CreateSession();
                categories = libraryDataService.GetCategories();
                transaction.ReturnStatus = true;
            }
            catch (Exception ex)
            {
                transaction.ReturnMessage = new List<string>();
                string errorMessage = ex.Message;
                transaction.ReturnStatus = false;
                transaction.ReturnMessage.Add(errorMessage);
            }
            finally
            {
                libraryDataService.CloseSession();
            }
            return categories;
        }
    }
}
