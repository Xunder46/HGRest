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
        public int OrderCommentId { get; set; }
        public virtual ICollection<OrderDetailModel> OrderDetails { get; set; }
    }
}