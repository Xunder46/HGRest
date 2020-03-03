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
var web_services_1 = require("../../web.services");
var router_1 = require("@angular/router");
var AppetizersComponent = /** @class */ (function () {
    function AppetizersComponent(services, activatedRoute) {
        this.services = services;
        this.activatedRoute = activatedRoute;
    }
    AppetizersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categoryName = this.activatedRoute.snapshot.paramMap.get('category');
        this.services.getCategoryByNameWithDishe(this.categoryName).subscribe(function (data) {
            _this.dishes = data.dishes.filter(function (thing, i, arr) { return arr.findIndex(function (t) { return t.dishName === thing.dishName; }) === i; });
        });
    };
    AppetizersComponent.prototype.addToCart = function (dish) {
        if (!JSON.parse(localStorage.getItem("dishes"))) {
            this.dishesInTheCart = [];
        }
        else {
            this.dishesInTheCart = JSON.parse(localStorage.getItem("dishes"));
        }
        this.dishesInTheCart.push(dish);
        localStorage.setItem("dishes", JSON.stringify(this.dishesInTheCart));
    };
    AppetizersComponent.prototype.showStorage = function () {
        console.log(localStorage["dishes"]);
    };
    AppetizersComponent = __decorate([
        core_1.Component({
            selector: 'appetizers',
            templateUrl: './appetizers.component.html',
            styleUrls: ['./appetizers.component.css', './../../global-layout.css']
        }),
        __metadata("design:paramtypes", [web_services_1.WebServices, router_1.ActivatedRoute])
    ], AppetizersComponent);
    return AppetizersComponent;
}());
exports.AppetizersComponent = AppetizersComponent;
//# sourceMappingURL=appetizers.component.js.map