import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/shopping-cart.service';
import { Dish } from '../models/Dish';
import { Category } from '../models/Category';
import { WebServices } from '../services/web.services';
import { Side } from '../models/Side';
import { FormControl, Validators } from '@angular/forms';
import { Item } from '../models/Item';
import { DishOption } from '../models/DishOption';
import { Size } from '../models/Size';

@Component({
  selector: 'customize-modal',
  templateUrl: './customize-modal.component.html',
  styleUrls: ['../categories/dishes.component.css', '../global-layout.css']
})
export class CustomizeModal implements OnInit {

  //UsefulProperties
  categoryId: number;
  closeResult: string;
  options: DishOption[];
  comments: string;
  additionalPrice: number = 0.0;

  sideControl = new FormControl('', Validators.required);

  @Input() dish: Dish;
  @Input() sides: Side[];
  @Input() category: Category;
  @Input() dishIngredients: Item[];
  @Input() allIngredients: Item[];
  @Input() sizes: Size[];

  //Properties to send to the shopping cart
  chosenSide: Side;
  chosenSize: Size;
  chosenOption: DishOption;
  modifiedDishIngredients: Item[] = [];
  removedIngredients: Item[] = [];

  constructor(private modalService: NgbModal, private cart: CartService, private services: WebServices) { }

  ngOnInit(): void {
    this.services.getOptionsByDishId(this.dish.dishId).subscribe(options => {
      this.options = options;
    })
  }

  open(content) {
    this.modifiedDishIngredients = [];
    this.removedIngredients = [];
    this.additionalPrice = 0;
    this.modalService.open(content, { ariaLabelledBy: 'customize-modal' }).result;
  }

  addToCart(_dish: Dish) {
    var dish = {
      dish: _dish,
      chosenOption: this.chosenOption || new DishOption(),
      chosenSize: this.chosenSize || new Size(),
      chosenSide: this.chosenSide || new Side(),
      additionalIngredients: this.modifiedDishIngredients,
      removedIngredients: this.removedIngredients,
      comments: this.dish.comments
    }
    console.log(dish)
    this.cart.addToCart(dish);
    this.modalService.dismissAll();
  }

  toggleDish(ingredient: Item) {
    if(!this.removedIngredients.includes(ingredient)){
      this.removedIngredients.push(ingredient);
    }
    else{
      let rIndex = this.removedIngredients.indexOf(ingredient)
      this.removedIngredients.splice(rIndex,1);
    }
  }

  toggleAll(ingredient: Item){
    this.additionalPrice = 0;

    if(this.modifiedDishIngredients.includes(this.allIngredients.find(a=>a==ingredient))){
      let mIndex = this.modifiedDishIngredients.indexOf(ingredient);
      this.modifiedDishIngredients.splice(mIndex, 1);
    }
    else{
      this.modifiedDishIngredients.push(ingredient);
    }

    for (let i = 0; i < this.modifiedDishIngredients.length; i++) {
      this.additionalPrice = this.additionalPrice + this.modifiedDishIngredients[i].price;
    }
  }
}