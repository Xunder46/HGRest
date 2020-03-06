"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var web_services_1 = require("../services/web.services");
var platform_browser_1 = require("@angular/platform-browser");
var MenuComponent = /** @class */ (function () {
    function MenuComponent(services, sanitizor) {
        this.services = services;
        this.sanitizor = sanitizor;
    }
    MenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.services.getCategories().subscribe(function (data) {
            _this.categories = data;
        });
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.css', './../global-layout.css'],
            styles: ["\n      :host \n    {\n      margin: 0; padding: 0;\n    }"
            ]
        }),
        __metadata("design:paramtypes", [web_services_1.WebServices, platform_browser_1.DomSanitizer])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map