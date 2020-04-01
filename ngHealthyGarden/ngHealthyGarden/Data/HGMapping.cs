using AutoMapper;
using ngHealthyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ngHealthyGarden.Data
{
    public class HGMapping : Profile
    {
        public HGMapping()
        {
            CreateMap<Dish, DishModel>();
                //.ForMember(c => c.SizeDescription, opt => opt.MapFrom(m => m.Size.Description))
                //.ForMember(c => c.SideDescription, opt => opt.MapFrom(m => m.Side.Description))
                //.ForMember(c => c.TortillaTypeDescription, opt => opt.MapFrom(m => m.TortillaType.Description));

            CreateMap<Category, CategoryModel>();
            CreateMap<Item, ItemModel>()
                .ReverseMap();
            CreateMap<Side, SideModel>();
            CreateMap<Order, OrderModel>()
                .ReverseMap();
            CreateMap<AddressInfo, AddrssInfoModel>();
            CreateMap<Comment, CommentModel>();
            CreateMap<CustomerInfo, CustomerInfoModel>();
            CreateMap<Option, OptionModel>();
            CreateMap<Order, OrderModel>();
            CreateMap<OrderDetail, OrderDetailModel>()
                .ReverseMap();
            CreateMap<OrderType, OrderTypeModel>();
            CreateMap<RestaurantInfo, RestaurantInfoModel>();
            CreateMap<Size, SizeModel>();
            CreateMap<ZipCode, ZipCodeModel>();
        }
    }
}