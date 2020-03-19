import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../services/shopping-cart.service';
import { Dish } from '../models/Dish';
import { Category } from '../models/Category';
import { WebServices } from '../services/web.services';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './customize-modal.component.html',
  styleUrls: ['../categories/dishes.component.css', '../global-layout.css']
})
export class NgbdModalBasic implements OnInit{
  selected
  closeResult: string;

  @Input() dish: Dish;
  @Input() category: Category;

  constructor(private modalService: NgbModal, private cart: CartService, private service: WebServices) { }
  ngOnInit(): void {
    this.service
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
  }

  addToCart(dish: Dish) {
    this.cart.addToCart(dish);
    this.modalService.dismissAll("dish added")
  }
}