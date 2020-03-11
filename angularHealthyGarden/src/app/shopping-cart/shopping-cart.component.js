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
var ShoppingCartComponent = /** @class */ (function () {
    function ShoppingCartComponent(_cart) {
        this._cart = _cart;
        this.cartIsEmpty = true;
        this.subtotal = 0;
        this.tax = 0;
        this.total = 0;
    }
    ShoppingCartComponent.prototype.ngOnInit = function () {
        if (!JSON.parse(localStorage.getItem("dishes"))) {
            this.dishesFromLocalStorage = [];
        }
        else {
            this.dishesFromLocalStorage = JSON.parse(localStorage.getItem("dishes"));
            this.cartIsEmpty = false;
        }
        for (var i = 0; i < this.dishesFromLocalStorage.length; i++) {
            this.subtotal += this.dishesFromLocalStorage[i].price;
        }
        this.tax = this.subtotal * 0.05;
        this.total = this.subtotal + this.tax;
    };
    //TODO: when order sent clear local storage
    ShoppingCartComponent.prototype.emptyCart = function () {
        this._cart.deleteItems();
        this.cartIsEmpty = true;
    };
    ShoppingCartComponent = __decorate([
        core_1.Component({
            providers: [shopping_cart_service_1.CartService],
            selector: 'shopping-cart',
            templateUrl: './shopping-cart.component.html',
            styleUrls: ['./shopping-cart.component.css', './../global-layout.css']
        }),
        __metadata("design:paramtypes", [shopping_cart_service_1.CartService])
    ], ShoppingCartComponent);
    return ShoppingCartComponent;
}());
exports.ShoppingCartComponent = ShoppingCartComponent;
//# sourceMappingURL=shopping-cart.component.js.map