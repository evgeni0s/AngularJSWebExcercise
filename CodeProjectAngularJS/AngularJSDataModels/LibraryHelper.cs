using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularJSDataModels
{
    public static class LibraryHelper
    {
        public static void CopyData(this Book target, Book source)
        {
            if (source == null)
            {
                return;
            }
            if (target == null)
            {
                target = new Book();
            }
            target.BookId = source.BookId;
            target.Name = source.Name;
            target.Text = source.Text;
            target.CategoryId = source.CategoryId;
            target.Category.CopyData(source.Category);
        }

        public static void CopyData(this Category target, Category source)
        {
            if (source == null)
            {
                return;
            }
            if (target == null)
            {
                target = new Category();
            }
            source.CategoryId = target.CategoryId;
            source.Name = target.Name;
        }
    }
}
