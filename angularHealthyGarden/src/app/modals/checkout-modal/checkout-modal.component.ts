import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { ZipCode } from 'src/app/models/ZipCode';
import { WebServices } from 'src/app/services/web.services';
import { Order } from 'src/app/models/Order';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { Comment } from './../../models/Comment';
import { CartService } from 'src/app/services/shopping-cart.service';
import { CustomerInfo } from 'src/app/models/CustomerInfo';
import { OrderType } from 'src/app/models/OrderType';
import { Restaurant } from 'src/app/models/Restaurant';
import { User } from 'src/app/models/User';

@Component({
  selector: 'checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./../../shopping-cart/shopping-cart.component.css']
})
export class CheckoutModalComponent implements OnInit {

  orderTypeControl = new FormControl('', Validators.required);
  restaurantControl = new FormControl('', Validators.required);
  phoneNumber = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  zipCode = new FormControl('', Validators.required);
  time = new FormControl('', Validators.required);

  @Input() dishesFromLocalStorage: any[];
  @Input() cartIsEmpty: boolean;
  @Output() cartIsEmptyChange = new EventEmitter<boolean>();

  orderTypes: OrderType[];
  restaurants: Restaurant[];
  zipCodes: ZipCode[];

  chosenType: OrderType;
  chosenRestaurant: Restaurant;
  chosenZip: ZipCode;
  customerAddress: string;
  requestedTime: string;
  customerPhoneNumber: string;
  user: User;
  customer: CustomerInfo;

  constructor(private _cart: CartService, private modalService: NgbModal, private services: WebServices) { }

  ngOnInit(): void {
    this.services.getZipCodes().subscribe(data => {
      this.zipCodes = data;
    })
    this.services.getOrderTypes().subscribe(data => {
      this.orderTypes = data;
    })
    this.services.getAllRestaurants().subscribe(data => {
      this.restaurants = data;
    })
    if (localStorage.getItem("user")) {
      this.services.getUserInfo().subscribe(user => {
        this.user = user;
        this.services.getAllCusttomerInfo(user.customerInfoId).subscribe(customer=>{
          this.customer = customer[0];
          this.services.getZipCodeById(customer[0].addressInfoes[0].zipCodeId).subscribe(address=>{
          })
        })
      })
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'checkout-modal' }).result;
  }
  emptyCart() {
    this._cart.deleteItems();
    this.cartIsEmptyChange.emit(true);
  }

  sendToDatabase() {
    let order = new Order();
    let orderDetails: OrderDetails[] = []
    for (var i = 0; i < this.dishesFromLocalStorage.length; i++) {
      let orderDetail = new OrderDetails();
      let dishComment = new Comment();

      if (this.dishesFromLocalStorage[i].comments) {
        dishComment.comments = this.dishesFromLocalStorage[i].comments;
        this.services.addComment(dishComment).subscribe(data => {
          orderDetail.commentId = data.commentId;
        });
      }
      else {
        orderDetail.commentId = null;
      }
      orderDetail.customerInfoId = 3;
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

      orderDetails.push(orderDetail);
    }

    let utc = new Date().toJSON().slice(0, 10);
    order.orderDate = utc;

    this.services.setNewOrder(order).subscribe(data => {
      this.services.setNewOrderDetails(data.orderId, orderDetails).subscribe(data => data)
    });

    this.emptyCart();
  }

  manageCustomerInfo() {
    let customerInfo = new CustomerInfo();
    customerInfo.firstName = this.firstName.value;
    customerInfo.lastName = this.lastName.value;
    customerInfo.phoneNumber = this.customerPhoneNumber;

    this.services.getUserByPhoneNumber(this.customerPhoneNumber).subscribe(data => {
      if (data) {
        if (localStorage.getItem("user")) {
          //fill the fields
          if (this.chosenType.orderType1 == "Delivery") {
            this.customerAddress = data.addressInfo.street + ', apt. ' + data.addressInfo.apartment;
            this.chosenZip
          }
          //this.sendToDatabase();
        }
        else {
          //fill the fields

          //this.sendToDatabase();
        }
      }
      else {
        if (localStorage.getItem("user")) {
          this.services.updateUser(customerInfo.phoneNumber)
          //this.sendToDatabase();
        }
        else {
          this.services.createCustomerDetails(customerInfo)
          //this.sendToDatabase();
        }
      }
    })
  }
}

