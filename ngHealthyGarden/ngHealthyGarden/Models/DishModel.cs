using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class DishModel
    {
        public int DishId { get; set; }
        public string DishName { get; set; }
        public decimal? Price { get; set; }
        public int? CategoryId { get; set; }
        public bool Active { get; set; }
        public virtual ICollection<Item> Items { get; set; }

    }
}