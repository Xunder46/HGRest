using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class CategoryModel
    {
        public string Description { get; set; }

        public virtual ICollection<DishModel> Dishes { get; set; }
    }
}