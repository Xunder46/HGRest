using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class ItemCategoryModel
    {
        public int ItemCategoryId { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Item> Items { get; set; }
    }
}