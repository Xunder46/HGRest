using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class SideModel
    {
        public int SideId { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> Price { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public Nullable<bool> Active { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}