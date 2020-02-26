import { Component, OnInit, Input } from '@angular/core';
import { WebServices } from '../../web.services';
import { Category } from '../../models/Category';

@Component({
    selector: 'appetizers',
    templateUrl: './appetizers.component.html',
    styleUrls: ['./appetizers.component.css']
})

export class AppetizersComponent implements OnInit {

    category: Category;
    @Input() categoryName: string;

    constructor(private services: WebServices) {

    }

    //TODO: bring categoryName from the component
    ngOnInit(): void {
        this.services.getCategoryByNameWithDishe(this.categoryName).subscribe(data => {
            this.category = data;
            console.log(JSON.stringify(data))
        })

    }

}
