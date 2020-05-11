import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { WebServices } from './web.service';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private router: Router, private services: WebServices) { }

    canActivate() {
        let user = JSON.parse(localStorage.getItem('user'));
        //decode token
        var decoded: any = jwt_decode(user.token);
        if (!this.isAuthenticated(user) || decoded.role !== 'Manager') {
            this.router.navigate(['login']);
            return false;
          }
          return true;
    }

    isAuthenticated(user: any) {
        if (user.token) {
            return true;
        }
        return false;
    }
}