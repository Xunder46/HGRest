import { Component } from '@angular/core';
import { Dish } from '../models/Dish';
import { CartService } from '../services/shopping-cart.service';

@Component({
    providers: [CartService],
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./../global-layout.css']
})
export class NavigationComponent {

    cart: any;
    counter: number;
    dishesInTheCart: Dish[] = [];

    constructor(private _cart: CartService) {
        setInterval(() => {
            if (this._cart.getItems()) {
                this.dishesInTheCart = this._cart.getItems()
            }
            else {
                this.dishesInTheCart = [];
            }
        }, 200)
    }
}