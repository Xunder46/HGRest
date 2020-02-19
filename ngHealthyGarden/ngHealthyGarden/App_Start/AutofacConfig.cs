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

namespace ngHealthyGarden.App_Start
{
    public class AutofacConfig
    {
        public static void Register()
        {
            var builder = new ContainerBuilder();
            var config = GlobalConfiguration.Configuration;
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            RegisterServices(builder);
            builder.RegisterWebApiFilterProvider(config);
            builder.RegisterWebApiModelBinderProvider();
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static void RegisterServices(ContainerBuilder builder)
        {
            //Automapper configuration to be able to map models from entities
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new PablosMapping());
            });
            builder.RegisterInstance(config.CreateMapper()).As<IMapper>().SingleInstance();

            builder.RegisterType<PablosDbContext>().InstancePerRequest();
            builder.RegisterType<PablosRepository>().As<IPablosRepository>().InstancePerRequest();
        }
    }
}