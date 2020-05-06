import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { WebServices } from './web.services';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private router: Router, private services: WebServices) { }

    canActivate() {
        // Check to see if a user has a valid token
        if (this.isAuthenticated()) {
            // If they do, return true and allow the user to load app
            return true;
        }

        // If not, they redirect them to the login page
        this.router.navigate(['']);
        return false;
    }

    isAuthenticated() {
        // get the auth token from localStorage
        let user = JSON.parse(localStorage.getItem('user'));
            if (user.token) {
                this.services.getUserInfo().subscribe(data=>{
                    if(data.roleName!='Manager'){
                        return false;
                    }
                }) 
            }
        return true;
    }
}