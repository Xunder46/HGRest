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
var shopping_cart_service_1 = require("../services/shopping-cart.service");
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(_cart) {
        var _this = this;
        this._cart = _cart;
        this.dishesInTheCart = [];
        setInterval(function () {
            if (_this._cart.getItems()) {
                _this.dishesInTheCart = _this._cart.getItems();
            }
            else {
                _this.dishesInTheCart = [];
            }
        }, 500);
    }
    NavigationComponent = __decorate([
        core_1.Component({
            providers: [shopping_cart_service_1.CartService],
            selector: 'navigation',
            templateUrl: './navigation.component.html',
            styleUrls: ['./../global-layout.css']
        }),
        __metadata("design:paramtypes", [shopping_cart_service_1.CartService])
    ], NavigationComponent);
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map