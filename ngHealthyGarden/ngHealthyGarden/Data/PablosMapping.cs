using AutoMapper;
using ngHealthyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Data
{
    public class PablosMapping : Profile
    {
        public PablosMapping()
        {
            CreateMap<Dish, DishModel>();
        }
    }
}