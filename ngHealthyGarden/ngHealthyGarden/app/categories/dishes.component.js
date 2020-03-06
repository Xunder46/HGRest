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
var router_1 = require("@angular/router");
var shopping_cart_service_1 = require("../services/shopping-cart.service");
var AppetizersComponent = /** @class */ (function () {
    function AppetizersComponent(services, activatedRoute, cart) {
        this.services = services;
        this.activatedRoute = activatedRoute;
        this.cart = cart;
        this.dishAdded = false;
    }
    AppetizersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categoryName = this.activatedRoute.snapshot.paramMap.get('category');
        this.services.getCategoryByNameWithDishe(this.categoryName).subscribe(function (data) {
            _this.dishes = data.dishes.filter(function (thing, i, arr) { return arr.findIndex(function (t) { return t.dishName === thing.dishName; }) === i; });
        });
    };
    AppetizersComponent.prototype.addToCart = function (dish) {
        this.cart.addToCart(dish);
    };
    AppetizersComponent.prototype.showStorage = function () {
        console.log(localStorage["dishes"]);
    };
    AppetizersComponent = __decorate([
        core_1.Component({
            providers: [shopping_cart_service_1.CartService],
            selector: 'dishes',
            templateUrl: './dishes.component.html',
            styleUrls: ['./dishes.component.css', './../global-layout.css']
        }),
        __metadata("design:paramtypes", [web_services_1.WebServices, router_1.ActivatedRoute, shopping_cart_service_1.CartService])
    ], AppetizersComponent);
    return AppetizersComponent;
}());
exports.AppetizersComponent = AppetizersComponent;
//# sourceMappingURL=dishes.component.js.map