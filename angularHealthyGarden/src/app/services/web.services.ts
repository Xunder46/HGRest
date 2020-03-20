import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/toPromise'
import { Category } from './../models/Category';
import { Item } from '../models/Item';
import { Side } from '../models/Side';

@Injectable({
	providedIn: "root"
})
export class WebServices {
    baseUrl: string = "api/";

    constructor(private http: HttpClient) {  }

    getCategories() {
        return this.http.get<Category[]>(this.baseUrl + 'menu');
    }

    getCategoryByNameWithDishes(category: string) {
        return this.http.get<Category>(this.baseUrl + 'dishes/' + category)
    }

    getItemsByDishName(dishName: string){
        return this.http.get<Item[]>(this.baseUrl + 'items/' + dishName)
    } 

    getSidesByCategoryId(categoryId: number){
        return this.http.get<Side[]>(this.baseUrl + 'sides/' +categoryId)
    }
}