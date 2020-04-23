﻿import { Component, OnInit, OnChanges } from '@angular/core';
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
    token: string;
    dishesCount: number;

    constructor(private _cart: CartService) {
        setInterval(() => {
            this.dishesCount = 0;
            if (this._cart.getItems()) {
                this.dishesInTheCart = this._cart.getItems();
                 _cart.getItems().forEach(a=>{
                    this.dishesCount = this.dishesCount + a.dish.quantity;
                })
            }
            else {
                this.dishesInTheCart = [];
            }
        }, 500)
    }

    isLoggedIn(){
        let user = JSON.parse(localStorage.getItem('user'));
        var now = new Date();
        if (user) {
            if((now.getTime()-user.logInTime)<21600000){
                this.token = user.token;
                return this.token ? true : false;
            }
            else{
                localStorage.removeItem("user");
            }
        }
    }
}