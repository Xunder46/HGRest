import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { ZipCode } from 'src/app/models/ZipCode';
import { WebServices } from 'src/app/services/web.service';
import { Order } from 'src/app/models/Order';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { Comment } from './../../models/Comment';
import { CartService } from 'src/app/services/shopping-cart.service';
import { CustomerInfo } from 'src/app/models/CustomerInfo';
import { OrderType } from 'src/app/models/OrderType';
import { Restaurant } from 'src/app/models/Restaurant';
import { User } from 'src/app/models/User';
import { AddressInfo } from 'src/app/models/Address';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderComment } from 'src/app/models/OrderComment';

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
  appartment = new FormControl('', Validators.required);
  zipCode = new FormControl('', Validators.required);
  time = new FormControl('', Validators.required);

  @Input() dishesFromLocalStorage: any[];
  @Input() cartIsEmpty: boolean;
  @Output() cartIsEmptyChange = new EventEmitter<boolean>();

  orderTypes: OrderType[];
  restaurants: Restaurant[];
  zipCodes: ZipCode[];
  minTime = new Date();

  chosenType: OrderType;
  chosenRestaurant: Restaurant;
  chosenZip: ZipCode;
  customerFirstName: string;
  customerLastName: string;
  customerAddress: string;
  customerAppartment: string;
  requestedTime: string;
  customerPhoneNumber: string;
  user: User;
  customer: CustomerInfo;
  orderComment:OrderComment = new OrderComment();

  constructor(private _cart: CartService, private modalService: NgbModal, private services: WebServices
    , private route: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.services.getZipCodes().subscribe(data => {
      this.zipCodes = data;
    });
    this.services.getOrderTypes().subscribe(data => {
      this.orderTypes = data;
    });
    this.services.getAllRestaurants().subscribe(data => {
      this.restaurants = data;
    });
    if (localStorage.getItem("user")) {
      this.services.getUserInfo().subscribe(user => {
        this.user = user;
        if (user.customerInfoId) {
          this.services.getAllCusttomerInfo(user.customerInfoId).subscribe(customer => {
            this.customer = customer;
          });
        }
      });
    }
  }

  calculateTime() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    if (this.chosenType.orderType1 == "Delivery") {
      if ((minutes + 45) >= 60) {
        hours = hours + 1;
        minutes = minutes - 60 + 45;
      }
      this.requestedTime = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' +
        ('0' + new Date().getDate()).slice(-2) + 'T' +
        (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes);
    }
    else {
      if ((minutes + 20) >= 60) {
        hours = hours + 1;
        minutes = minutes - 60 + 20;
      }
      else {
        minutes = minutes + 20;
      }
      this.requestedTime = new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' +
        ('0' + new Date().getDate()).slice(-2) + 'T' +
        (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes);
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'checkout-modal' }).result;
  }

  emptyCart() {
    this.toastr.success("You have successfully placed your order!", "", {
      closeButton: true,
      progressBar: false,
      positionClass: "toast-top-full-width",
      timeOut: 3000,
      extendedTimeOut: 2000
    });
    this._cart.deleteItems();
    this.cartIsEmptyChange.emit(true);
  }

  manageOrderDetails(customerInfoId: number) {
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
      orderDetail.customerInfoId = customerInfoId;
      orderDetail.dishId = this.dishesFromLocalStorage[i].dish.dishId;
      orderDetail.items = this.dishesFromLocalStorage[i].removedIngredients;
      orderDetail.items1 = this.dishesFromLocalStorage[i].additionalIngredients;
      orderDetail.optionId = this.dishesFromLocalStorage[i].chosenOption.optionId || null;
      orderDetail.sideId = this.dishesFromLocalStorage[i].chosenSide.sideId || null;
      orderDetail.sizeId = this.dishesFromLocalStorage[i].chosenSize.sizeId || null;
      orderDetail.orderTypeId = this.chosenType.orderTypeId;
      orderDetail.price = this.dishesFromLocalStorage[i].dish.price;
      orderDetail.quantity = this.dishesFromLocalStorage[i].quantity;
      if (this.chosenType.orderType1 == "Delivery") {
        orderDetail.restaurantId = this.chosenZip.restaurantId;
      }
      else {
        orderDetail.restaurantId = this.chosenRestaurant?.restaurantInfoId;
      }
      orderDetail.requestedTime = this.requestedTime;
      orderDetails.push(orderDetail);
    }
    let utc = new Date().toJSON().slice(0, 10);
    order.orderDate = utc;

    if(this.orderComment.orderComment1){
      this.services.addOrderComment(this.orderComment).subscribe(oc=>{
        order.orderCommentId = oc.orderCommentId;
        this.services.setNewOrder(order).subscribe(order => {
          this.services.setNewOrderDetails(order.orderId, orderDetails).subscribe(od => od);
        });
      })
    }
    else{
      this.services.setNewOrder(order).subscribe(order => {
        this.services.setNewOrderDetails(order.orderId, orderDetails).subscribe(od => od);
      });
    }
  }

  manageCustomerAddress(customerInfoId: number) {
    let addressInfo = new AddressInfo();
    addressInfo.apartment = this.customerAppartment;
    addressInfo.street = this.customerAddress;
    addressInfo.zipCodeId = this.chosenZip.zipCodeId;
    addressInfo.customerInfoId = customerInfoId;
    this.services.getAllAddresses().subscribe(addresses => {
      if (!addresses.find(a => a.apartment.toLowerCase() == addressInfo.apartment.toLowerCase()
        && a.customerInfoId == addressInfo.customerInfoId
        && a.street.toLowerCase() == addressInfo.street.toLowerCase()
        && a.zipCodeId == addressInfo.zipCodeId)) {
        this.services.addCustomerAddress(addressInfo).subscribe(address => address);
      }
    })
  }

  sendOrder() {
    let customerInfo = new CustomerInfo();
    customerInfo.firstName = this.customerFirstName;
    customerInfo.lastName = this.customerLastName;
    this.services.getUserByPhoneNumber(this.customerPhoneNumber).subscribe(
      (data) => {
        if (data) {
          if (data.customerInfoId) {
            //create order
            this.manageOrderDetails(data.customerInfoId);
            if (this.chosenType.orderType1 == "Delivery") {
              //create address info
              this.manageCustomerAddress(data.customerInfoId);
            }
          }
          else {
            //create customer info
            this.services.createCustomerDetails(customerInfo).subscribe(cd => {
              //create order
              this.manageOrderDetails(cd.customerInfoId);
              //update user
              let user = new User();
              user.customerInfoId = cd.customerInfoId;
              user.email = data.email;
              user.userName = data.userName;
              user.joinDate = data.joinDate;
              user.phoneNumber = data.phoneNumber;
              this.services.updateUser(user).subscribe(data => data);
              this.manageCustomerAddress(user.customerInfoId);
              this.toastr.info("Please, log in again", "We have updated your personal info", {
                closeButton: true,
                progressBar: false,
                positionClass: "toast-top-full-width",
                timeOut: 3000,
                extendedTimeOut: 2000
              });
              localStorage.removeItem("user");
              this.route.navigate(['login']);
            });
          }
        }
        else {
          //create customer info
          this.services.createCustomerDetails(customerInfo).subscribe(data => {
            //create order
            this.manageOrderDetails(data.customerInfoId);
            if (this.chosenType.orderType1 == "Delivery") {
              //create address info
              this.manageCustomerAddress(data.customerInfoId)
            }
          })

        }
      },
      (err) => {
      },
      () => {
        this.emptyCart();
        this.modalService.dismissAll();
      })
  }

  findCustomerInfo() {
    if (this.phoneNumber.value.length == 10) {
      this.services.getUserByPhoneNumber(this.customerPhoneNumber).subscribe(data => {
        if (data) {
          if (data.customerInfoId) {
            this.populateFields(this.customer);
          }
          else {
            this.clearFields()
          }
        }
      });
    }
  }

  clearFields() {
    this.customerFirstName = "";
    this.customerLastName = "";
    if (this.chosenType.orderType1 == "Delivery") {
      this.customerAddress = "";
      this.customerAppartment = "";
      this.chosenZip = null;
    }
  }

  populateFields(customer: CustomerInfo) {
    this.customerFirstName = customer?.firstName;
    this.customerLastName = customer?.lastName;
    if (this.chosenType.orderType1 == "Delivery") {
      this.customerAddress = customer?.addressInfoes[0]?.street;
      this.customerAppartment = customer?.addressInfoes[0]?.apartment;
      this.chosenZip = this.zipCodes.find(z => z.zipCodeId == customer?.addressInfoes[0]?.zipCodeId) || null;
      this.zipCode.setValue(this.chosenZip);
    }
  }
}