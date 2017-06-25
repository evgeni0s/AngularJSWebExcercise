using AngularJSDataModels;
using AngularJSWebApplication.WebApiModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularJSWebApplication.Helpers
{
    public static class LibraryHelper
    {
        public static BookDTO Convert(this Book book)
        {
            if (book == null)
            {
                return null;
            }
            return new BookDTO
            {
                BookId = book.BookId,
                Category = Convert(book.Category),
                CategoryId = book.CategoryId,
                Name = book.Name,
                Text = book.Text
            };
        }

        public static CategoryDTO Convert(this Category category)
        {
            if (category == null)
            {
                return null;
            }
            return new CategoryDTO
            {
                //Books = Convercategory.Books
                CategoryId = category.CategoryId,
                Name = category.Name
            };
        }


        public static Book Convert(this BookDTO book)
        {
            if (book == null)
            {
                return null;
            }
            return new Book
            {
                BookId = book.BookId,
                Category = Convert(book.Category),
                CategoryId = book.CategoryId,
                Name = book.Name,
                Text = book.Text
            };
        }

        public static Category Convert(this CategoryDTO category)
        {
            if (category == null)
            {
                return null;
            }
            return new Category
            {
                //Books = Convercategory.Books
                CategoryId = category.CategoryId,
                Name = category.Name
            };
        }

        public static void CopyData(this TransactionalInformation target, TransactionalInformation source)
        {
            if (target == null)
            {
                return;
            }
            target.ReturnMessage = source.ReturnMessage;
            target.ReturnStatus = source.ReturnStatus;
            target.ValidationErrors = source.ValidationErrors;
        }
    }
}