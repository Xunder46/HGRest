using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class CustomerInfoModel
    {
        public int CustomerInfoId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int? AddressInfoId { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}