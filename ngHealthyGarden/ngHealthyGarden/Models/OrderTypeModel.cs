using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class OrderTypeModel
    {
        public int OrderTypeId { get; set; }
        public string OrderType1 { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}