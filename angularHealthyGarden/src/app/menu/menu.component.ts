import { Component, OnInit, HostListener } from '@angular/core';
import { WebServices } from '../services/web.services'
import { Category } from '../models/Category';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css','./../global-layout.css'],
    styles: [`
      :host 
    {
      margin: 0; padding: 0;
    }`
    ]
})
export class MenuComponent implements OnInit {

    categoriesUrl: string;
    categories: Category[];
    image: any;
    

    constructor(private services: WebServices, private sanitizor: DomSanitizer) {
    }

    ngOnInit() {
        this.services.getCategories().subscribe(data => { 
            this.categories = data;
        });
    }
}
