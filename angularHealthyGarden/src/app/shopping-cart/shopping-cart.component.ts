import { Component, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../models/Dish';
import { CartService } from '../services/shopping-cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebServices } from '../services/web.services';
import { Order } from '../models/Order';
import { OrderDetails } from '../models/OrderDetails';
import { Comment } from '../models/Comment';

@Component({
    providers: [CartService],
    selector: 'shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css', './../global-layout.css']
})
export class ShoppingCartComponent implements OnInit {

    cartIsEmpty: boolean = true;
    dishesFromLocalStorage: any[];
    subtotal: number = 0;
    tax: number = 0;
    total: number = 0;

    constructor(private _cart: CartService, private modalService: NgbModal, private services: WebServices) {

    }

    ngOnInit() {
        if (!JSON.parse(localStorage.getItem("dishes"))) {
            this.dishesFromLocalStorage = [];
        }
        else {
            this.dishesFromLocalStorage = JSON.parse(localStorage.getItem("dishes"));
            this.cartIsEmpty = false;
        }
        this.buildShoppingCartTotal();
    }

    emptyCart() {
        this._cart.deleteItems();
        this.cartIsEmpty = true;
    }

    refreshPrice(dish: any) {
        this.dishesFromLocalStorage.splice(this.dishesFromLocalStorage.indexOf(dish), 1, dish);
        localStorage.setItem("dishes", JSON.stringify(this.dishesFromLocalStorage));
        this.buildShoppingCartTotal();
    }

    buildShoppingCartTotal() {
        this.subtotal = 0;
        for (var i = 0; i < this.dishesFromLocalStorage.length; i++) {
            if(this.dishesFromLocalStorage[i].chosenSize.additionalPrice){
                this.subtotal += (this.dishesFromLocalStorage[i].dish.price + this.dishesFromLocalStorage[i].chosenSize.additionalPrice) 
                * this.dishesFromLocalStorage[i].quantity;
            }
            else{
                this.subtotal += this.dishesFromLocalStorage[i].dish.price * this.dishesFromLocalStorage[i].quantity;
            }
            if (this.dishesFromLocalStorage[i].additionalIngredients) {
                for (var j = 0; j < this.dishesFromLocalStorage[i].additionalIngredients.length; j++) {
                    this.subtotal += this.dishesFromLocalStorage[i].additionalIngredients[j].price * this.dishesFromLocalStorage[i].quantity;
                }
            }
        }
        this.tax = this.subtotal * 0.06625;
        this.total = this.subtotal + this.tax;
    }

    deleteDish(dish: any){
        let dishToRemove = this.dishesFromLocalStorage.indexOf(dish);
        this.dishesFromLocalStorage.splice(dishToRemove, 1);
        localStorage.setItem("dishes", JSON.stringify(this.dishesFromLocalStorage));
        if(!this.dishesFromLocalStorage.length){
            this.cartIsEmpty = true;
        }
    }
}