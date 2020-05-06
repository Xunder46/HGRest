import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls:['./app.component.css']
})
export class AppComponent implements OnInit {
    token: string;

    ngOnInit() {
        let user = JSON.parse(localStorage.getItem('user'));
        var now = new Date();
        if (user) {
            if((now.getTime()-user.logInTime)<21600000){
                this.token = user.token;
                return this.token ? true : false;
            }
            else{
                localStorage.removeItem("user");
            }
        }
    }
}
