using AutoMapper;
using StoreManagementStudio.Server.Models;
using StoreManagementStudio.Server.Dtos;

namespace StoreManagementStudio.Server.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<Sales, SaleDto>().ReverseMap();   
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Store, StoreDto>().ReverseMap();
        }
    }
}
