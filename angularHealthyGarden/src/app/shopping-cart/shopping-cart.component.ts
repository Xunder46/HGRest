import { Component, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../models/Dish';
import { CartService } from '../services/shopping-cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    providers:[CartService],
    selector: 'shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css', './../global-layout.css']
})
export class ShoppingCartComponent implements OnInit {

    @ViewChild('myModal') myModal;
    
    cartIsEmpty: boolean = true;
    dishesFromLocalStorage: Dish[];
    subtotal: number = 0;
    tax: number = 0;
    total: number = 0;

    constructor(private _cart: CartService, private modalService: NgbModal) {

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

    //TODO: when order sent clear local storage
    emptyCart() {
        this._cart.deleteItems();
        this.cartIsEmpty = true;
    }

    opentContent(dish: Dish){
        this.modalService.open(this.myModal)
    }

    refreshPrice(dish: Dish){
        this.dishesFromLocalStorage.splice(this.dishesFromLocalStorage.indexOf(dish), 1, dish);
        console.log(this.dishesFromLocalStorage)
        this.buildShoppingCartTotal()
        
    }

    buildShoppingCartTotal(){
        this.subtotal = 0;
        for (var i = 0; i < this.dishesFromLocalStorage.length; i++) {
            this.subtotal += this.dishesFromLocalStorage[i].price * this.dishesFromLocalStorage[i].quantity;
        }
        this.tax = this.subtotal * 0.05;
        this.total = this.subtotal + this.tax;
    }
}