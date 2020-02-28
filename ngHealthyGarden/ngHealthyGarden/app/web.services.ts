import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import 'rxjs/add/operator/toPromise'
import { Category } from './models/Category';

@Injectable()
export class WebServices {
    baseUrl: string = "https://localhost:44384/api";

    constructor(private http: HttpClient) {

    }

    getCategories() {
        return this.http.get<Category[]>(this.baseUrl + '/menu');
    }

    getCategoryByNameWithDishe(category: string) {
        return this.http.get<Category>(this.baseUrl + '/menu/' + category)
    }
}