import { Component, OnInit, Input } from '@angular/core';
import { WebServices } from '../../web.services';
import { Category } from '../../models/Category';
import { Dish } from '../../models/Dish';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'appetizers',
    templateUrl: './appetizers.component.html',
    styleUrls: ['./appetizers.component.css', './../../global-layout.css']
})

export class AppetizersComponent implements OnInit {

    dishes: Dish[];
    categoryName: string;

    constructor(private services: WebServices, private activatedRoute: ActivatedRoute) {
       
    }

    ngOnInit(): void {
        this.categoryName = this.activatedRoute.snapshot.paramMap.get('category');
        this.services.getCategoryByNameWithDishe(this.categoryName).subscribe(data => {
            this.dishes = data.dishes.filter(
                (thing, i, arr) => arr.findIndex(t => t.dishName === thing.dishName) === i
            );
        })
    }

    addToCart() {

    }
}
