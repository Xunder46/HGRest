using Newtonsoft.Json.Serialization;
using ngHealthyGarden.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json;

namespace ngHealthyGarden
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            //AutofacConfig.Register();

            //Json serrialize to camelcase
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver =
                new CamelCasePropertyNamesContractResolver();
            //Enabling cors for angular app
            var enableCorsAttribute = new EnableCorsAttribute(origins: "*", headers: "*", methods: "*");

            var json = config.Formatters.JsonFormatter;

            //json.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.Objects;
            config.Formatters.Remove(config.Formatters.XmlFormatter);

            config.EnableCors(enableCorsAttribute);
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
            name: "CartApi",
            routeTemplate: "api/menu/shoppingcart",
            defaults: new { controller = "Home", action = "Index" }
        );

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);
        }
    }
}
