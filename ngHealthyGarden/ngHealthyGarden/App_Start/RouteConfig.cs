using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ngHealthyGarden
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
            name: "Home",
            url: "{*.}",
            defaults: new { controller = "Home", action = "Index" }
        );

            routes.MapRoute(
            name: "Cart",
            url: "{controller}/shoppingcart",
            defaults: new { controller = "Home", action = "Index" }
        );

            routes.MapRoute(
            name: "Category",
            url: "{controller}/{category}"
        );

            routes.MapRoute(
            name: "Default",
            url: "{controller}/{action}/{angular}",
            defaults: new { controller = "Home", action = "Index", angular = UrlParameter.Optional }
        );
            
        }
    }
}
