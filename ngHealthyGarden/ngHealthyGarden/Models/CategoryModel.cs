using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class CategoryModel
    {
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public Nullable<bool> Active { get; set; }
        public virtual ICollection<DishModel> Dishes { get; set; }
    }
}