import { Injectable } from '@angular/core';
import { Dish } from '../models/Dish';
import { JsonPipe } from '@angular/common';
import { Side } from '../models/Side';

@Injectable()
export class CartService {

    private dishesInTheCart: any[];

    public addToCart(dish: any) {
        
        if (!JSON.parse(localStorage.getItem("dishes"))) {
            this.dishesInTheCart = [];
        }

        else {
            this.dishesInTheCart = JSON.parse(localStorage.getItem("dishes"));

        }
        this.dishesInTheCart.push(dish);
        localStorage.setItem("dishes", JSON.stringify(this.dishesInTheCart));
    }

    public getItems(): any[] {
        this.dishesInTheCart = JSON.parse(localStorage.getItem("dishes"));
        return this.dishesInTheCart;
    }

    public deleteItems() {
        localStorage.removeItem("dishes");
        this.dishesInTheCart = [];
    }
}