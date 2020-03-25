using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class RestaurantInfoModel
    {
        public int RestaurantInfoId { get; set; }
        public string Location { get; set; }
        public string Phone { get; set; }
        public virtual ICollection<ZipCode> ZipCodes { get; set; }
    }
}