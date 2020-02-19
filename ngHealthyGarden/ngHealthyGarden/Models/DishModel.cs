using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class DishModel
    {
        public string DishName { get; set; }
        public Nullable<decimal> Price { get; set; }
        public string Picture { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public Nullable<int> SizeId { get; set; }
        public Nullable<int> SideId { get; set; }
        public Nullable<int> TortillaId { get; set; }

        //size info

    }
}