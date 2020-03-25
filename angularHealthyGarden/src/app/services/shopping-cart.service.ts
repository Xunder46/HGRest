import { Injectable } from '@angular/core';
import { Dish } from '../models/Dish';
import { JsonPipe } from '@angular/common';
import { Side } from '../models/Side';

@Injectable()
export class CartService {

    private dishesInTheCart: Dish[];
    private chosenSide: Side[];

    public addToCart(dish: Dish) {
        
        if (!JSON.parse(localStorage.getItem("dishes"))) {
            this.dishesInTheCart = [];
        }
        else if(!JSON.parse(localStorage.getItem("sides"))){
            this.chosenSide = [];
        }

        else {
            this.dishesInTheCart = JSON.parse(localStorage.getItem("dishes"));

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