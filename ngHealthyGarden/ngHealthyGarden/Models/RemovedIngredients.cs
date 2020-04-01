using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class RemovedIngredients
    {
        public int OrderDetailId { get; set; }
        public OrderDetail OrderDetail { get; set; }

        public int ItemId { get; set; }
        public Item Item { get; set; }
    }
}