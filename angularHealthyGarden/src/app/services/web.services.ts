import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/toPromise'
import { Category } from './../models/Category';
import { Item } from '../models/Item';
import { Side } from '../models/Side';
import { Size } from '../models/Size';
import { DishOption } from '../models/DishOption';
import { Order } from '../models/Order';
import { OrderDetails } from '../models/OrderDetails';
import { Comment } from '../models/Comment';

@Injectable({
    providedIn: "root"
})
export class WebServices {
    baseUrl: string = "api/";

    constructor(private http: HttpClient) { }

    //#region CATEGORIES 

    getCategories() {
        return this.http.get<Category[]>(this.baseUrl + 'menu');
    }

    getCategoryByNameWithDishes(category: string) {
        return this.http.get<Category>(this.baseUrl + 'dishes/' + category)
    }

    //#endregion

    //#region ITEMS 

    getAllItems() {
        return this.http.get<Item[]>(this.baseUrl + 'items/')
    }

    getItemsByDishName(dishName: string) {
        return this.http.get<Item[]>(this.baseUrl + 'items/' + dishName)
    }

    //#endregion

    //#region SIDES 


    getAllSides() {
        return this.http.get<Side[]>(this.baseUrl + 'sides')
    }

    getSidesByCategoryId(categoryId: number) {
        return this.http.get<Side[]>(this.baseUrl + 'sides/' + categoryId)
    }

    //#endregion

    //#region SIZES 
    getSizesByCategoryId(categoryId: number) {
        return this.http.get<Size[]>(this.baseUrl + 'sizes/' + categoryId)
    }
    //#endregion

    //#region OPTIONS

    getOptionsByDishId(dishId: number) {
        return this.http.get<DishOption[]>(this.baseUrl + 'options/' + dishId)
    }

    //#endregion

    //#region ORDERS 
    setNewOrder(o: Order) {
        return this.http.post<Order>(this.baseUrl + 'orders', o);
    }
    setNewOrderDetails(orderId: number, od: OrderDetails[]) {
        return this.http.post<OrderDetails[]>(this.baseUrl + 'orders/' + orderId, od);
    }
    //#endregion

    //#region COMMENTS 
    addComment(comment: Comment){
        return this.http.post<Comment>(this.baseUrl +"comments", comment);
    }
    //#endregion
}