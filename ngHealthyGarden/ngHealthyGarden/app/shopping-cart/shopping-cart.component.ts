import { Component, OnInit } from '@angular/core';
import { Dish } from '../models/Dish';

@Component({
    selector: 'shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css', './../global-layout.css']
})
export class ShoppingCartComponent implements OnInit {

    cartIsEmpty: boolean = true;
    dishesFromLocalStorage: Dish[];
    subtotal: number = 0;
    tax: number = 0;
    total: number = 0;

    ngOnInit() {
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
    }

    //TODO: when order sent clear local storage
    emptyCart() {
        localStorage.clear();
        this.dishesFromLocalStorage = [];
        this.cartIsEmpty = true;
    }
}