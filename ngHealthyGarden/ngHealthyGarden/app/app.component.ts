import { Component, OnInit } from '@angular/core';
import { Category } from './models/Category';
import { WebServices } from './web.services';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    categories: Category[]

    constructor(private services: WebServices) {

    }

    ngOnInit() {
        this.services.getCategories().subscribe(data => {
            this.categories = data;
        });
    }
}
