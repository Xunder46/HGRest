import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/shopping-cart.service';
import { Dish } from '../models/Dish';
import { Category } from '../models/Category';
import { WebServices } from '../services/web.services';
import { Side } from '../models/Side';
import { FormControl, Validators } from '@angular/forms';
import { Item } from '../models/Item';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './customize-modal.component.html',
  styleUrls: ['../categories/dishes.component.css', '../global-layout.css']
})
export class NgbdModalBasic {
  
  categoryId: number;
  closeResult: string;

  sideControl = new FormControl('', Validators.required);

  @Input() dish: Dish;
  @Input() sides: Side[];
  @Input() category: Category;
  @Input() ingredients: Item[]

  constructor(private modalService: NgbModal, private cart: CartService, private service: WebServices) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
    console.log(this.sides)
  }

  addToCart(dish: Dish) {
    this.cart.addToCart(dish);
    this.modalService.dismissAll("dish added")
  }
}