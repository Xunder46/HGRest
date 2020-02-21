import { Component, OnInit } from '@angular/core';
import { WebServices } from '../web.services'
import { Category } from '../models/Category';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

    categories: Category[]

    constructor(private services: WebServices) {

    }

    ngOnInit() {
        this.services.getCategories().subscribe(data => {
            this.categories = data;
        });
    }
}
