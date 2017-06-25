using AngularJSDataServiceInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularJSDataModels;

namespace AngularJSDataService
{
    public class LibraryDataService : EntityFrameworkDataService, ILibraryDataService
    {
        public void CreateBook(Book book)
        {
            dbConnection.Books.Add(book);
        }

        public Book GetBook(int bookId)
        {
            return dbConnection.Books.Find(bookId);
        }

        public List<Book> GetBooks()
        {
            return dbConnection.Books.ToList();
        }

        public List<Category> GetCategories()
        {
            return dbConnection.Categories.ToList();
        }

        public void UpdateOrder(Book book)
        {
            throw new NotImplementedException();
        }
    }
}
