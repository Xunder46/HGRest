using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class ZipCodeModel
    {
        public int ZipCodeId { get; set; }
        public string ZipCode1 { get; set; }
        public string City { get; set; }
        public int RestaurantId { get; set; }
        public virtual ICollection<AddressInfo> AddressInfo { get; set; }
    }
}