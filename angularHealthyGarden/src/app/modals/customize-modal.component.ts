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
  dishIngredientsNames: string[];
  allIngredientsNames: string[];
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
  modifiedDishIngredients: Item[];

  constructor(private modalService: NgbModal, private cart: CartService, private services: WebServices) { }

  ngOnInit(): void {
    this.services.getOptionsByDishId(this.dish.dishId).subscribe(options => {
      this.options = options;
    })
  }

  open(content) {
    this.dishIngredientsNames = [];
    this.allIngredientsNames = [];

    for (let i = 0; i < this.allIngredients.length; i++) {
      this.allIngredientsNames.push(this.allIngredients[i].description);
    }
    for (let i = 0; i < this.dishIngredients.length; i++) {
      this.dishIngredientsNames.push(this.dishIngredients[i].description);
    }
    this.allIngredientsNames = this.allIngredientsNames.filter(a => !this.dishIngredientsNames.includes(a))

    this.modalService.open(content, { ariaLabelledBy: 'customize-modal' }).result;
  }

  addToCart(_dish: Dish) {
    this.getOnlyNewlyAddedIngredients();

    var dish = {
      dish: _dish,
      chosenOption: this.chosenOption,
      chosenSize: this.chosenSize,
      chosenSide: this.chosenSide,
      dishIngredients: this.modifiedDishIngredients
    }

    this.cart.addToCart(dish);
    this.modalService.dismissAll("dish added")
  }

  toggleIngredient(ingredientName: string) {
    TODO://Add and remove ingredient + display price correctly (array of all and array of dish. Push and remove on click)
    if (this.dishIngredients.includes(this.allIngredients.find(a=>a.description==ingredientName))) {
      debugger
      this.allIngredients.push(this.dishIngredients.find(d=>d.description==ingredientName));
      this.allIngredients.sort();
      this.dishIngredients = this.dishIngredients.filter(d => d.description != ingredientName);
    }
    else {
      this.dishIngredients.push(this.allIngredients.find(d=>d.description==ingredientName));
      this.allIngredients = this.allIngredients.filter(d => d.description != ingredientName);
      this.allIngredients.sort();
    }
    this.getOnlyNewlyAddedIngredients();
    for (let i = 0; i < this.modifiedDishIngredients.length; i++) {
      this.additionalPrice = this.additionalPrice + this.modifiedDishIngredients[i].price;
    }
  }

  getOnlyNewlyAddedIngredients(){
    this.modifiedDishIngredients = [];
    for (let i = 0; i < this.dishIngredients.length; i++) {
      this.modifiedDishIngredients.push(this.dishIngredients[i])
      console.log(this.modifiedDishIngredients)
    }
    for (let i = 0; i < this.dishIngredients.length; i++) {
       this.modifiedDishIngredients.filter(m => m.description != this.dishIngredients[i].description);
    }
  }
}