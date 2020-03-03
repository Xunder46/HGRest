"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ShoppingCartComponent = /** @class */ (function () {
    function ShoppingCartComponent() {
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
        localStorage.clear();
        this.dishesFromLocalStorage = [];
        this.cartIsEmpty = true;
    };
    ShoppingCartComponent = __decorate([
        core_1.Component({
            selector: 'shopping-cart',
            templateUrl: './shopping-cart.component.html',
            styleUrls: ['./shopping-cart.component.css', './../global-layout.css']
        })
    ], ShoppingCartComponent);
    return ShoppingCartComponent;
}());
exports.ShoppingCartComponent = ShoppingCartComponent;
//# sourceMappingURL=shopping-cart.component.js.map