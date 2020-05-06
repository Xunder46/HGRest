import { Component, OnInit } from '@angular/core';
import { WebServices } from './../services/web.services'
import { Category } from '../models/Category';
import { User } from '../models/User';

@Component({
    selector: 'welcome',
    templateUrl: './welcome.component.html',
    styleUrls:['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
    user: any;
    userInfo: User;

    constructor(private services: WebServices){

    }

    ngOnInit(): void {
        this.user = localStorage.getItem("user");
        if(this.user){
            this.services.getUserInfo().subscribe(data=>{
                this.userInfo = data;
            })
        }
    }

}