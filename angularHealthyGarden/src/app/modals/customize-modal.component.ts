import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/shopping-cart.service';
import { Dish } from '../models/Dish';
import { Category } from '../models/Category';
import { WebServices } from '../services/web.services';
import { Side } from '../models/Side';
import { FormControl, Validators } from '@angular/forms';
import { Item } from '../models/Item';

@Component({
  selector: 'customize-modal',
  templateUrl: './customize-modal.component.html',
  styleUrls: ['../categories/dishes.component.css', '../global-layout.css']
})
export class CustomizeModal {

  categoryId: number;
  closeResult: string;
  dishIngredientsNames: string[];
  allIngredientsNames: string[];

  comments: string;

  sideControl = new FormControl('', Validators.required);

  @Input() dish: Dish;
  @Input() sides: Side[];
  @Input() category: Category;
  @Input() dishIngredients: Item[];
  @Input() allIngredients: Item[];


  constructor(private modalService: NgbModal, private cart: CartService) { }

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
    console.log(this.allIngredientsNames)

    this.modalService.open(content, { ariaLabelledBy: 'customize-modal' }).result;
  }

  addToCart(dish: any) {
    this.cart.addToCart(dish);
    this.modalService.dismissAll("dish added")

  }

  toggleIngredient(ingredientName: string) {
    if (this.dishIngredientsNames.includes(ingredientName)) {
      this.dishIngredientsNames = this.dishIngredientsNames.filter(d => d != ingredientName)
      this.allIngredientsNames.push(ingredientName);
      this.allIngredientsNames.sort();
    }
    else{
      this.allIngredientsNames = this.allIngredientsNames.filter(d => d != ingredientName)
      this.dishIngredientsNames.push(ingredientName);
      this.allIngredientsNames.sort();
    }
  }
}