//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ngHealthyGarden
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;

    public partial class AddressInfo
    {
        public int AddressInfoId { get; set; }
        public string Street { get; set; }
        public string Apartment { get; set; }
        public int ZipCodeId { get; set; }
        public Nullable<int> CustomerInfoId { get; set; }
    
        public virtual ZipCode ZipCode { get; set; }
        [IgnoreDataMember]
        public virtual CustomerInfo CustomerInfo { get; set; }
    }
}
