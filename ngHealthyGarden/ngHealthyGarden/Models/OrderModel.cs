using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class OrderModel
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}