import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebServices } from '../services/web.services';
import { Side } from '../models/Side';
import { Dish } from '../models/Dish';
import { Item } from '../models/Item';

@Component({
    selector: 'management-modal',
    templateUrl: './management.html',
    styleUrls: ['../categories/dishes.component.css', '../global-layout.css']
})
export class ManagementModal implements OnInit {
    ingredients: Item[];
    sides: Side[];
    flag: string = '';
    allDishes: Dish[]=[];
    dishesToUpdate: Dish[] = [];
    checked:boolean;

    constructor(private services: WebServices, private modalService: NgbModal){}


    ngOnInit(): void {
        this.refreshData();
    }

    refreshData(){
        this.services.getAllSides().subscribe(data=>{
            this.sides=data;
        });
        this.services.getAllItems().subscribe(data=>{
            this.ingredients = data
        })
        this.services.getAllDishes().subscribe(data=>{
            this.allDishes = data.filter((thing, i, arr) => arr.findIndex(t => t.dishName === thing.dishName) === i);
        });
    }

    toggleDish(dish: Dish){
        if(dish.active){
            dish.active = false;
            this.dishesToUpdate.push(dish);
        }
        else{
            dish.active = true;
            this.dishesToUpdate.push(dish);
        }
    }
        
    open(content, flag:string): void {
        this.refreshData();
        this.flag = flag;
        this.modalService.open(content, { ariaLabelledBy: 'management-modal' }).result;
    }

    save(){
        this.dishesToUpdate.forEach(dish=>{
            this.services.addDish(dish).subscribe(data=>data);
        })
        this.modalService.dismissAll();
    }

    deleteUser(side){}

    editUser(side){}
}