import { Component, OnInit } from '@angular/core';
import { WebServices } from '../services/web.services';
import { Dish } from '../models/Dish';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/shopping-cart.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Item } from '../models/Item';
import { Category } from '../models/Category';
import { Side } from '../models/Side';
import { Size } from '../models/Size';
import { DishOption } from '../models/DishOption';

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
    ingredients: Item[][] = [];
    category: Category
    sides: Side[] = [];
    allIngredients: Item[];
    sizes: Size[];
    options: DishOption[];

    constructor(private services: WebServices, private activatedRoute: ActivatedRoute, private cart: CartService) { }

    ngOnInit(): void {
        this.categoryName = this.activatedRoute.snapshot.paramMap.get('category');
        
        //GETTING DISHES BY CATEGORY NAME
        this.services.getCategoryByNameWithDishes(this.categoryName).subscribe(data => {
            this.category = data;
            this.dishes = data.dishes.filter(
                (thing, i, arr) => arr.findIndex(t => t.dishName === thing.dishName) === i
            ).filter(d=>d.active==true);
            console.log(this.dishes)
            //GETTING INGREDIENTS FOR EACH DISH
            for (let i = 0; i < this.dishes.length; i++) {
                this.services.getItemsByDishName(this.dishes[i].dishName).subscribe(items => {
                    this.ingredients[i] = items;
                    console.log(items)
                });
            }

            //GETTING SIDE FOR DISHES BY CATEGORYID
            this.services.getSidesByCategoryId(this.category.categoryId).subscribe(data => {
                this.sides = data;
            });

            //GETTING SIZES FOR DISHES BY CATEGORYID
            this.services.getSizesByCategoryId(this.category.categoryId).subscribe(data => {
                this.sizes = data;
            });
        });

        //GETTING ALL INGREDIENTS
        this.services.getAllItems().subscribe(data=>{
            this.allIngredients = data;
        });
        
    }
}