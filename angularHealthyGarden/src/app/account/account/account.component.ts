import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { WebServices } from 'src/app/services/web.services';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { Dish } from 'src/app/models/Dish';
import { Order } from 'src/app/models/Order';

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

  //output props
  username: string;
  phonenumber: string;

  constructor(private route: Router, private services: WebServices) { }

  ngOnInit(): void {
    this.services.getUserInfo().subscribe(data => {
      this.user = data;
      this.username = data.userName;
      this.phonenumber = data.phoneNumber;
      this.services.getOrderedDishesByCustomerId(data.customerInfoId).subscribe(details => {
        for (let i = 0; i < details.length; i++) {
          if (this.orderIds.indexOf(details[i].orderId) < 0) {
            this.orderIds.push(details[i].orderId);
            this.orderDetails.push(details[i]);
            this.services.getOrderDetailsByOrderId(details[i].orderId).subscribe(o => {
              this.orders.push(o);
              this.dishes[o.orderId] = [];
              o.orderDetails.forEach(od=>{
                this.services.getDishById(od.dishId).subscribe(d=>{
                  this.dishes[o.orderId].push(d);
                })
              })
            });
          }
          this.totalAmountSpent += details[i].price * details[i].quantity;
          for (let j = 0; j < details[i].items.length; j++) {
            this.totalAmountSpent += details[i].items[j].price;
          }
        }
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
