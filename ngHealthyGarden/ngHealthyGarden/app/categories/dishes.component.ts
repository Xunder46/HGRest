import { Component, OnInit } from '@angular/core';
import { WebServices } from '../services/web.services';
import { Dish } from '../models/Dish';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/shopping-cart.service';

@Component({
    providers: [CartService],
    selector: 'dishes',
    templateUrl: './dishes.component.html',
    styleUrls: ['./dishes.component.css', './../global-layout.css']
})
export class AppetizersComponent implements OnInit {

    dishes: Dish[];
    categoryName: string;
    dishAdded: boolean = false;

    constructor(private services: WebServices, private activatedRoute: ActivatedRoute, private cart: CartService) {
       
    }

    ngOnInit(): void {
        this.categoryName = this.activatedRoute.snapshot.paramMap.get('category');
        this.services.getCategoryByNameWithDishe(this.categoryName).subscribe(data => {
            this.dishes = data.dishes.filter(
                (thing, i, arr) => arr.findIndex(t => t.dishName === thing.dishName) === i
            );
        })
    }

    addToCart(dish: Dish) {
        this.cart.addToCart(dish);  
    }

    showStorage() {
        console.log(localStorage["dishes"]);
    }
}
