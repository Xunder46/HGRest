using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class SizeModel
    {
        public int SizeId { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public decimal AdditionalPrice { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}