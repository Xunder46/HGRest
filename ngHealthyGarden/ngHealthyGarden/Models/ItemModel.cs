using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class ItemModel
    {
        public int ItemId { get; set; }
        public string Description { get; set; }
        public int ItemCategoryId { get; set; }
        public decimal Price { get; set; }
        public virtual ICollection<Dish> Dishes { get; set; }
        public virtual ICollection<OrderDetailModel> OrderDetails { get; set; }
        public virtual ICollection<OrderDetailModel> OrderDetails1 { get; set; }
    }
}