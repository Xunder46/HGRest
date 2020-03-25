using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class OptionModel
    {
        public int OptionId { get; set; }
        public string Description { get; set; }
        public int DishId { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}