using AngularJSDataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJSWebApplication.WebApiModels
{
    // response DTO. Controller -> JS
    public class LibraryApiModel : TransactionalInformation
    {
        public Book Book;
        public List<Book> Books;
        public List<Category> Categories;
        public LibraryApiModel()
        {
            Books = new List<Book>();
            Categories = new List<Category>();
        }
    }

    public class CategoryDTO
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public List<BookDTO> Books { get; set; }
    }
    public class BookDTO
    {
        public int BookId { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public int CategoryId { get; set; }
        public CategoryDTO Category { get; set; }
    }
}