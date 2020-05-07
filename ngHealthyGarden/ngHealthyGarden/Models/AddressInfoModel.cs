using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class AddressInfoModel
    {
        public int AddressInfoId { get; set; }
        public string Street { get; set; }
        public string Apartment { get; set; }
        public int ZipCodeId { get; set; }
        [IgnoreDataMember]
        public int? CustomerInfoId { get; set; }
    }
}