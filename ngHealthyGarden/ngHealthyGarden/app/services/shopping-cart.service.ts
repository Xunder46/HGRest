import { Injectable } from '@angular/core';
import { Dish } from '../models/Dish';

@Injectable()
export class CartService {

    private dishesInTheCart: Dish[] = [];

    public addToCart(dish: Dish) {
        if (!this.getItems()) {
            this.dishesInTheCart = [];
        }
        else {
            this.getItems();

        }
        this.dishesInTheCart.push(dish);
        localStorage.setItem("dishes", JSON.stringify(this.dishesInTheCart));
    }

    public getItems(): Dish[] {
        this.dishesInTheCart = JSON.parse(localStorage.getItem("dishes"));
        return this.dishesInTheCart;
    }

    public deleteItems() {
        localStorage.clear();
        this.dishesInTheCart = [];
    }
}