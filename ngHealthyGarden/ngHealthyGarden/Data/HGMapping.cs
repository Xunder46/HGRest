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

            CreateMap<Category, CategoryModel>()
                .ReverseMap();
            CreateMap<Item, ItemModel>()
                .ReverseMap();
            CreateMap<ItemCategory, ItemCategoryModel>()
                .ReverseMap();
            CreateMap<Side, SideModel>()
                .ReverseMap();
            CreateMap<Order, OrderModel>()
                .ReverseMap();
            CreateMap<AddressInfo, AddressInfoModel>()
                .ReverseMap();
            CreateMap<Comment, CommentModel>()
                .ReverseMap();
            CreateMap<CustomerInfo, CustomerInfoModel>()
                .ReverseMap();
            CreateMap<Option, OptionModel>()
                .ReverseMap();
            CreateMap<Order, OrderModel>()
                .ReverseMap();
            CreateMap<OrderDetail, OrderDetailModel>()
                .ReverseMap();
            CreateMap<OrderType, OrderTypeModel>()
                .ReverseMap();
            CreateMap<RestaurantInfo, RestaurantInfoModel>()
                .ReverseMap();
            CreateMap<Size, SizeModel>()
                .ReverseMap();
            CreateMap<ZipCode, ZipCodeModel>()
                .ReverseMap();
        }
    }
}