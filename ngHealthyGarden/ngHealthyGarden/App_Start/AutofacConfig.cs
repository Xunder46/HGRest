using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using Autofac.Integration.WebApi;
using ngHealthyGarden.Data;
using AutoMapper;
using System.Web.Mvc;
using Autofac.Integration.Mvc;

namespace ngHealthyGarden
{
    public class AutofacConfig
    {
        public static IContainer Register()
        {
            var builder = new ContainerBuilder();
            var config = new HttpConfiguration();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            RegisterServices(builder);
            builder.RegisterWebApiFilterProvider(config);
            builder.RegisterWebApiModelBinderProvider();
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            return container;
        }

        private static void RegisterServices(ContainerBuilder builder)
        {
            //Automapper configuration to be able to map models from entities
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new HGMapping());
            });
            builder.RegisterInstance(config.CreateMapper()).As<IMapper>().SingleInstance();

            builder.RegisterType<HGDbContext>().InstancePerRequest();
            builder.RegisterType<HGRepository>().As<IHGRepository>().InstancePerRequest();
        }
    }
}