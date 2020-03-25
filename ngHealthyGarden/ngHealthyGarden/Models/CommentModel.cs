using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class CommentModel
    {
        public int CommentId { get; set; }
        public string Comments { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}