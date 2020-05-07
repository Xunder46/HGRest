import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dish } from 'src/app/models/Dish';
import { FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { WebServices } from 'src/app/services/web.services';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.css', './../../../global-layout.css']
})
export class DishModalComponent implements OnInit, OnChanges {

  @Input() dish: Dish;

  categories: Category[] = [];
  category: Category;
  allIngredients: Item[];
  dishIngredients: Item[];
  newIngredients: Item[] = [];
  oldIngredients: Item[] = [];
  newDish: boolean = true;

  dishName = new FormControl('', Validators.required);
  categoryControl = new FormControl('', Validators.required);
  priceControl = new FormControl('', Validators.required);

  constructor(private modalService: NgbModal, private services: WebServices) { }

  ngOnInit(): void {
  }

  ngOnChanges():void{
  }

  open(content, flag: boolean): void {
    this.newDish = flag;
    this.services.getItemsByDishName(this.dish.dishName).subscribe(data=>{
      this.dishIngredients = data;
      this.services.getAllItems().subscribe(all=>{
        for(var i=0;i<all.length;i++) {
          for(var j=0;j<data.length;j++) {
            if(data[j].description == all[i].description) {
            var index = all.indexOf(all[i]);
            all.splice(index,1);
            }
          }
        }
        this.allIngredients = all;
        console.log(this.dishIngredients, this.allIngredients)
      });
    });
    this.services.getCategories().subscribe(data=>{
      this.categories = data;
      this.category = this.categories.find(d=>d.categoryId==this.dish.categoryId);
    });
    if(flag){
      this.category = new Category();
      this.dish = new Dish();
      this.dish.active = true;
    }
    this.modalService.open(content, { ariaLabelledBy: 'dish-modal' }).result;
  }

  saveDish(dish: Dish){
    dish.categoryId = this.category.categoryId;
    this.services.addDish(dish).subscribe(data=>{
      if(this.newIngredients.length>0){
        this.services.setItem(data.dishId, this.newIngredients).subscribe(data=>{
        });
      }
      if(this.oldIngredients.length>0){
        this.oldIngredients.forEach(o=>{
          this.services.deleteItem(dish.dishId, o.itemId).subscribe(data=>{
          });
        })
      }
    });
    this.modalService.dismissAll();
  }

  addIngredient(ingredient:Item){
    if(this.newIngredients.indexOf(ingredient)<0){
      this.newIngredients.push(ingredient);
    }
    else{
      this.newIngredients.splice(this.newIngredients.indexOf(ingredient), 1);
    }
  }

  removeIngredient(ingredient: Item){
    this.dishIngredients.splice(this.dishIngredients.indexOf(ingredient), 1);
    this.allIngredients.push(ingredient);
    this.oldIngredients.push(ingredient);
  }
}
