"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var web_services_1 = require("./web.services");
var menu_component_1 = require("./menu/menu.component");
var http_2 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var welcome_component_1 = require("./welcome/welcome.component");
var appetizers_component_1 = require("./Categories/Appetizers/appetizers.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                http_2.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                router_1.RouterModule,
                forms_1.FormsModule
            ],
            providers: [
                web_services_1.WebServices,
                { provide: common_1.APP_BASE_HREF, useValue: '/' }
            ],
            declarations: [
                app_component_1.AppComponent, menu_component_1.MenuComponent, welcome_component_1.WelcomeComponent, appetizers_component_1.AppetizersComponent
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map