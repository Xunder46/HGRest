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
    
    public partial class ZipCode
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ZipCode()
        {
            this.AddressInfoes = new HashSet<AddressInfo>();
        }
    
        public int ZipCodeId { get; set; }
        public string ZipCode1 { get; set; }
        public string City { get; set; }
        public int RestaurantId { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AddressInfo> AddressInfoes { get; set; }
        public virtual RestaurantInfo RestaurantInfo { get; set; }
    }
}