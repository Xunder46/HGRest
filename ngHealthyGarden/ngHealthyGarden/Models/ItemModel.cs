using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class ItemModel
    {
        public ItemModel()
        {
            this.Dishes = new HashSet<Dish>();
        }

        public string Description { get; set; }
        public int ItemCategory { get; set; }
        public decimal Price { get; set; }

        public virtual ICollection<Dish> Dishes { get; set; }
    }
}