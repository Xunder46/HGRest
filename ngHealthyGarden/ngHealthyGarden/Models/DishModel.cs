﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Models
{
    public class DishModel
    {
        public string DishName { get; set; }
        public Nullable<decimal> Price { get; set; }
        public string Picture { get; set; }

        //related info
        public string SizeDescription { get; set; }
        public string SideDescription { get; set; }
        public string  TortillaTypeDescription { get; set; }

    }
}