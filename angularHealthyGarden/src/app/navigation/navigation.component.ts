import { Component, OnInit, OnChanges } from '@angular/core';
import { Dish } from '../models/Dish';
import { CartService } from '../services/shopping-cart.service';
import { Location } from '@angular/common';

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
    token: string;
    dishesCount: number;

    constructor(private _cart: CartService, private _location: Location) {
        setInterval(() => {
            this.dishesCount = 0;
            if (this._cart.getItems()) {
                this.dishesInTheCart = this._cart.getItems();
                _cart.getItems().forEach(a => {
                    this.dishesCount = this.dishesCount + a.quantity;
                })
            }
            else {
                this.dishesInTheCart = [];
            }
        }, 500)
    }

    isLoggedIn() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.token = user.token;
            return this.token ? true : false;
        }
    }

    goBack(){
        return this._location.back();
    }
}