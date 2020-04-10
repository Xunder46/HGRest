import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

    base_url: string;

    constructor(private router: Router) {}

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
        let user = localStorage.getItem('user');
        if (user) {
            let token = JSON.parse(user).access_token;
            if (token) {
                return true;
            }
        }
    
        return false;
    }
}