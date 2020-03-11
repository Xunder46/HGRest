"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CartService = /** @class */ (function () {
    function CartService() {
        this.dishesInTheCart = [];
    }
    CartService.prototype.addToCart = function (dish) {
        if (!this.getItems()) {
            this.dishesInTheCart = [];
        }
        else {
            this.getItems();
        }
        this.dishesInTheCart.push(dish);
        localStorage.setItem("dishes", JSON.stringify(this.dishesInTheCart));
    };
    CartService.prototype.getItems = function () {
        this.dishesInTheCart = JSON.parse(localStorage.getItem("dishes"));
        return this.dishesInTheCart;
    };
    CartService.prototype.deleteItems = function () {
        localStorage.clear();
        this.dishesInTheCart = [];
    };
    CartService = __decorate([
        core_1.Injectable()
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
//# sourceMappingURL=shopping-cart.service.js.map