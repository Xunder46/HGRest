import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { WebServices } from 'src/app/services/web.services';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { Dish } from 'src/app/models/Dish';
import { Order } from 'src/app/models/Order';
import { CustomerInfo } from 'src/app/models/CustomerInfo';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', './../../global-layout.css']
})
export class AccountComponent implements OnInit {
  user: User = new User();
  orders: Order[] = [];
  orderDetails: OrderDetails[] = [];
  dishes: Dish[][] = [];
  totalAmountSpent = 0;
  orderTotal: number[] = [];
  tax = 0.0625;
  orderIds: number[] = [];
  customer: CustomerInfo = new CustomerInfo();

  //output props
  username: string;
  phonenumber: string;

  constructor(private route: Router, private services: WebServices) { }

  ngOnInit(): void {
    this.customer.addressInfoes = [];
    this.services.getUserInfo().subscribe(data => {
      this.services.getAllCusttomerInfo(data.customerInfoId).subscribe(customer => {
        this.customer = customer;
      });
      this.user = data;
      this.username = data.userName;
      this.phonenumber = data.phoneNumber;
      this.services.getOrderedDishesByCustomerId(data.customerInfoId).subscribe(details => {
        details.filter((thing, i, arr) => arr.findIndex(t => t.orderId === thing.orderId) === i)
        details.forEach(detail=>{
          if (this.orderIds.indexOf(detail.orderId) < 0) {
            this.services.getOrderDetailsByOrderId(detail.orderId).subscribe(o => {
              this.orders.push(o);
            });
            this.dishes[detail.orderId] = [];
            this.orderIds.push(detail.orderId);
          }
          this.orderDetails.push(detail);
          this.dishes[detail.orderId].push(detail.dish);
          
          this.totalAmountSpent += detail.price * detail.quantity;
          for (let j = 0; j < detail.items.length; j++) {
            this.totalAmountSpent += detail.items[j].price;
          }
        })
        this.totalAmountSpent = this.totalAmountSpent * this.tax + this.totalAmountSpent;
      })
    })
  }

  manageAccountInfo(){

  }

  goToMenu(){
    this.route.navigate(['menu']);
  }

  logOut() {
    localStorage.removeItem("user");
    this.route.navigate(['']);
  }
}
