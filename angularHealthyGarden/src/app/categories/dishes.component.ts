import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { WebServices } from '../services/web.services';
import { Dish } from '../models/Dish';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/shopping-cart.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Item } from '../models/Item';
import { map } from 'rxjs/operators';
import { Category } from '../models/Category';

@Component({
    animations: [
        trigger('dishAdded', [
            state('initial', style({
                bottom: '-5em',
                left: '-5em',
                opacity: '0',
                transform: 'translateX(-10em) rotate(90deg) scale(0.5)'
            })),
            state('final', style({
                bottom: '2em',
                left: '2em',
                opacity: '1',
                transform: 'translateX(0) rotate(0deg) scale(1)'
            })),
            transition('initial=>final', animate('1500ms')),
            transition('final=>initial', animate('1000ms'))
        ]),
    ],
    providers: [CartService],
    selector: 'dishes',
    templateUrl: './dishes.component.html',
    styleUrls: ['./dishes.component.css', './../global-layout.css']
})

export class DishesComponent implements OnInit {

    dishes: Dish[] = [];
    categoryName: string;
    dishAdded: boolean = false;
    items: Item[][] = [];
    category: Category

    constructor(private services: WebServices, private activatedRoute: ActivatedRoute, private cart: CartService) { }

    @ViewChild('ingredient', { static: false }) public ingredient: ElementRef;
    ngOnInit(): void {
        this.categoryName = this.activatedRoute.snapshot.paramMap.get('category');

        this.services.getCategoryByNameWithDishes(this.categoryName).subscribe(data => {
            this.category = data;
            this.dishes = data.dishes.filter(
                (thing, i, arr) => arr.findIndex(t => t.dishName === thing.dishName) === i
            )
            for (let i = 0; i < this.dishes.length; i++) {
                this.services.getItemsByDishName(this.dishes[i].dishName).subscribe(items => {
                    this.items[i] = items;
                })
            }
        })
    }
}