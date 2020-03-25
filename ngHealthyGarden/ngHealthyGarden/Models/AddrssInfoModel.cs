using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class AddrssInfoModel
    {
        public int AddressInfoId { get; set; }
        public string Street { get; set; }
        public string Apartment { get; set; }
        public int ZipId { get; set; }
        public virtual ICollection<CustomerInfo> CustomerInfoes { get; set; }
    }
}