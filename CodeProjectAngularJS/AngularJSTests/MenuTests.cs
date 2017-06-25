using AngularJSDataService;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularJSTests
{
    [TestClass]
    public class MenuTests
    {
        [TestMethod]
        public void AddMenuItem()
        {
            var service = new ApplicationDataService();
            try
            {
                service.CreateSession();
                service.BeginTransaction();
                var menuItem = service.CreateMenuItem("Book Details", "#Library/BookDetailsControllerView", "Library", true, 2);
                service.dbConnection.ApplicationMenuItems.Add(menuItem);
                service.CommitTransaction(true);
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                service.CloseSession();
            }
        }
    }
}
