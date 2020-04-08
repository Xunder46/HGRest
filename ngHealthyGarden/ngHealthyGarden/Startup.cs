using System;
using System.Collections.Generic;
using System.Linq;
using ngHealthyGarden.App_Start;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(ngHealthyGarden.Startup))]

namespace ngHealthyGarden
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
