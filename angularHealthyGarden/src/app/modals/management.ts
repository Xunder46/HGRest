import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebServices } from '../services/web.services';
import { Side } from '../models/Side';
import { Dish } from '../models/Dish';
import { Item } from '../models/Item';
import { Category } from '../models/Category';
import { Router } from '@angular/router';

@Component({
    selector: 'management-modal',
    templateUrl: './management.html',
    styleUrls: ['../categories/dishes.component.css', '../global-layout.css']
})
export class ManagementModal implements OnInit {

    allIngredients: Item[];
    allSides: Side[];
    allDishes: Dish[];
    allCategories: Category[];

    flag: string = '';

    dishesToUpdate: Dish[] = [];
    sidesToUpdate: Side[] = [];
    categoriesToUpdate: Category[] = [];

    constructor(private services: WebServices, private modalService: NgbModal, private route: Router) { }


    ngOnInit(): void {
    }

    refreshData() {
        if (this.flag == 'sides') {
            this.services.getAllSides().subscribe(data => {
                this.allSides = data.filter((thing, i, arr) => arr.findIndex(t => t.description === thing.description) === i);;
            });
        }
        else if (this.flag == 'items') {
            this.services.getAllItems().subscribe(data => {
                this.allIngredients = data.filter((thing, i, arr) => arr.findIndex(t => t.description === thing.description) === i);
            })
        }
        else if (this.flag == 'dishes') {
            this.services.getAllDishes().subscribe(data => {
                this.allDishes = data.filter((thing, i, arr) => arr.findIndex(t => t.dishName === thing.dishName) === i);
            });
        }
        else if (this.flag == 'categories') {
            this.services.getCategories().subscribe(data => {
                this.allCategories = data.filter((thing, i, arr) => arr.findIndex(t => t.description === thing.description) === i);
            })
        }
    }

    toggleDish(dish: Dish) {
        if (this.dishesToUpdate.indexOf(dish) < 0) {
            if (dish.active) {
                dish.active = false;
                this.dishesToUpdate.push(dish);
            }
            else {
                dish.active = true;
                this.dishesToUpdate.push(dish);
            }
        }
        else {
            this.dishesToUpdate.splice(this.dishesToUpdate.indexOf(dish), 1);
        }
    }

    toggleSide(side: Side) {
        if (this.sidesToUpdate.indexOf(side) < 0) {
            if (side.active) {
                side.active = false;
                this.sidesToUpdate.push(side);
            }
            else {
                side.active = true;
                this.sidesToUpdate.push(side);
            }
        }
        else {
            this.sidesToUpdate.splice(this.sidesToUpdate.indexOf(side), 1);
        }
        console.log(this.sidesToUpdate)
    }

    toggleCategory(category: Category) {
        if (this.categoriesToUpdate.indexOf(category) < 0) {
            if (category.active) {
                category.active = false;
                this.categoriesToUpdate.push(category);
            }
            else {
                category.active = true;
                this.categoriesToUpdate.push(category);
            }
        }
        else {
            this.categoriesToUpdate.splice(this.categoriesToUpdate.indexOf(category), 1);
        }
    }

    open(content, flag: string): void {
        this.flag = flag;
        this.modalService.open(content, { ariaLabelledBy: 'management-modal' }).result;
        this.refreshData();
    }

    saveDishes() {
        this.dishesToUpdate.forEach(dish => {
            this.services.addDish(dish).subscribe(data => data);
        })
        this.modalService.dismissAll();
    }

    saveItems() {}

    saveSides() {
        this.sidesToUpdate.forEach(side => {
            this.services.addSide(side).subscribe(data => data);
        })
        this.modalService.dismissAll();
    }

    saveCategories() {
        this.categoriesToUpdate.forEach(category => {
            this.services.addCategory(category).subscribe(data => data);
        })
        this.modalService.dismissAll();
    }

    goToMain() {
        this.route.navigate(['']);
    }

    logOut() {
        localStorage.removeItem("user");
        this.route.navigate(['']);
    }
}