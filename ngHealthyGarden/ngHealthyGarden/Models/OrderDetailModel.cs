using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class OrderDetailModel
    {
        public int OrderDetailId { get; set; }
        public int DishId { get; set; }
        public Nullable<int> SideId { get; set; }
        public Nullable<int> SizeId { get; set; }
        public Nullable<int> OptionId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int CustomerInfoId { get; set; }
        public int OrderTypeId { get; set; }
        public int? RestaurantId { get; set; }
        public Nullable<int> CommentId { get; set; }
        public int OrderId { get; set; }
        public virtual ICollection<ItemModel> Items { get; set; }
        public virtual ICollection<ItemModel> Items1 { get; set; }
        public string RequestedTime { get; set; }
        public virtual DishModel Dish { get; set; }
    }
}