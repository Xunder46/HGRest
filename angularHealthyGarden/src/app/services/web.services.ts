import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
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
import { User } from '../models/User';
import { ZipCode } from '../models/ZipCode';
import { CustomerInfo } from '../models/CustomerInfo';
import { OrderType } from '../models/OrderType';
import { Restaurant } from '../models/Restaurant';
import { AddressInfo } from '../models/Address';

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
    getOrderTypes(){
        return this.http.get<OrderType[]>(this.baseUrl + "ordertypes");
    }
    //#endregion

    //#region COMMENTS 
    addComment(comment: Comment) {
        return this.http.post<Comment>(this.baseUrl + "comments", comment);
    }
    //#endregion

    //#region USERS 
    getUserByPhoneNumber(phoneNumber:string){
        return this.http.get<User>(this.baseUrl + "account/" + phoneNumber);
    }
    login(username, password){
        var data = "username="+username+"&password="+password+"&grant_type=password";
        var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        
        return this.http.post("https://localhost:44384/auth/token", data, {headers: reqHeader});
    }
    signup(user: any){
        return this.http.post<any>(this.baseUrl + "account/create", user);
    }
    updateUser(user: any){
        return this.http.put<any>(this.baseUrl + "account/update", user);
    }
    getUserInfo(){
        let user = JSON.parse(localStorage.getItem('user'));
        let token = user.token;
        return this.http.get<User>(this.baseUrl+"account/userclaims", {headers: new HttpHeaders({
            'Authorization': 'Bearer '+ token,
            'Content-Type':'application/json'
        })})
    }
    //#endregion

    //#region ZIPCODES
    getZipCodes(){
        return this.http.get<ZipCode[]>(this.baseUrl + "zipcodes");
    }
    getZipCodeById(zipCodeId:number){
        return this.http.get<ZipCode>(this.baseUrl + "zipcodes/" + zipCodeId);
    }
    //#endregion

    //#region RESTAURANTS 
    getAllRestaurants(){
        return this.http.get<Restaurant[]>(this.baseUrl+"restaurants");
    }
    getRestaurantByZipCode(zipCode: string){
        return this.http.get<ZipCode>(this.baseUrl + "restaurants/" + zipCode);
    }
    //#endregion

    //#region CUSTOMER_INFO 
    getAllCusttomerInfo(customerInfoId:number){
        return this.http.get<CustomerInfo>(this.baseUrl+"customers/" + customerInfoId);
    }
    createCustomerDetails(customerInfo:CustomerInfo){
        return this.http.post<CustomerInfo>(this.baseUrl + "customers", customerInfo);
    }
    updateCustomerInfo(customerInfo: CustomerInfo) {
        return this.http.put<CustomerInfo>(this.baseUrl + "customer", customerInfo);
    }
    //#endregion

    //#region ADDRESS_INFO 
    getAllAddresses(){
        return this.http.get<AddressInfo[]>(this.baseUrl + "addressinfo");    
    }
    getAddressInfoById(customerInfoId:number){
        return this.http.get<AddressInfo[]>(this.baseUrl+"addressinfo/" + customerInfoId);
    }
    addCustomerAddress(addressInfo: AddressInfo){
        return this.http.post<AddressInfo>(this.baseUrl+"addressinfo", addressInfo);
    }
    //#endregion

}