using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class SideModel
    {
        public string Description { get; set; }
        public Nullable<decimal> Price { get; set; }
        public Nullable<int> CategoryId { get; set; }
    }
}