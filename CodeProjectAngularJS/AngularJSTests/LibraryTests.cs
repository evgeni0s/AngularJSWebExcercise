using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AngularJSWebApplication.WebApiControllers;
using AngularJSWebApplication.WebApiModels;
using AngularJSDataService;

namespace AngularJSTests
{
    [TestClass]
    public class LibraryTests
    {
        [TestMethod]
        public void AddBookToLibrary()
        {
            var library = new LibraryDataService();
            try
            {
                library.CreateSession();
                library.BeginTransaction();
                library.dbConnection.Books.Add(new AngularJSDataModels.Book()
                {
                    CategoryId = 1,
                    Name = "Book from Test",


                });
                library.CommitTransaction(true);
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                library.CloseSession();
            }
        }

        [TestMethod]
        public void AddCategoryToLibrary()
        {
            var library = new LibraryDataService();
            try
            {
                library.CreateSession();
                library.BeginTransaction();
                library.dbConnection.Categories.Add(new AngularJSDataModels.Category()
                {
                    Name = "CSS"
                });
                library.CommitTransaction(true);
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                library.CloseSession();
            }

        }

    }
}
