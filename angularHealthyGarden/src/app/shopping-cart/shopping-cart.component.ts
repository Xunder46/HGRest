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

    @ViewChild('myModal') myModal;

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
        console.log(this.dishesFromLocalStorage)
    }

    //TODO: when order sent clear local storage
    emptyCart() {
        this._cart.deleteItems();
        this.cartIsEmpty = true;
    }

    refreshPrice(dish: any) {
        this.dishesFromLocalStorage.splice(this.dishesFromLocalStorage.indexOf(dish), 1, dish);
        console.log(this.dishesFromLocalStorage)
        this.buildShoppingCartTotal()

    }

    buildShoppingCartTotal() {
        this.subtotal = 0;
        for (var i = 0; i < this.dishesFromLocalStorage.length; i++) {
            this.subtotal += this.dishesFromLocalStorage[i].dish.price * this.dishesFromLocalStorage[i].dish.quantity;
            if (this.dishesFromLocalStorage[i].additionalIngredients) {
                for (var j = 0; j < this.dishesFromLocalStorage[i].additionalIngredients.length; j++) {
                    this.subtotal += this.dishesFromLocalStorage[i].additionalIngredients[j].price;
                }
            }
        }
        this.tax = this.subtotal * 0.05;
        this.total = this.subtotal + this.tax;
    }

    sendToDatabase() {
        console.log('done')
        let order = new Order();
        let orderDetails: OrderDetails[] = []
        for (var i = 0; i < this.dishesFromLocalStorage.length; i++) {
            let orderDetail = new OrderDetails();
            let dishComment = new Comment();

            if(this.dishesFromLocalStorage[i].comments){
                dishComment.comments = this.dishesFromLocalStorage[i].comments;
                this.services.addComment(dishComment).subscribe(data=>{
                    orderDetail.commentId = data.commentId;
                });
            }
            else{
                orderDetail.commentId = null;
            }
            orderDetail.customerInfoId = 2;
            orderDetail.dishId = this.dishesFromLocalStorage[i].dish.dishId;
            orderDetail.items = this.dishesFromLocalStorage[i].removedIngredients;
            orderDetail.items1 = this.dishesFromLocalStorage[i].additionalIngredients;
            orderDetail.optionId = this.dishesFromLocalStorage[i].chosenOption.optionId || null;
            orderDetail.sideId = this.dishesFromLocalStorage[i].chosenSide.sideId || null;
            orderDetail.sizeId = this.dishesFromLocalStorage[i].chosenSize.sizeId || null;
            orderDetail.orderTypeId = 1;
            orderDetail.price = this.dishesFromLocalStorage[i].dish.price;
            orderDetail.quantity = this.dishesFromLocalStorage[i].dish.quantity;
            orderDetail.restaurantId = 1;
            orderDetail.quantity = this.dishesFromLocalStorage[i].dish.quantity;

            orderDetails.push(orderDetail);
        }
        console.log(orderDetails)

        let utc = new Date().toJSON().slice(0, 10);
        order.orderDate = '4/1/2020';

        this.services.setNewOrder(order).subscribe(data => {
            this.services.setNewOrderDetails(data.orderId, orderDetails).subscribe(data => console.log(data))
        });
    }
}