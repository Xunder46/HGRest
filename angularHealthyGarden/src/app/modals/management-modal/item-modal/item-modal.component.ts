import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { WebServices } from 'src/app/services/web.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemCategory } from 'src/app/models/ItemCategory';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css', './../../../global-layout.css']
})
export class ItemModalComponent implements OnInit {

  @Input() item: Item;

  itemCategories: ItemCategory[];
  itemCategory: ItemCategory;
  newItem: boolean = true;

  itemCategoryControl = new FormControl('', Validators.required);
  itemNameControl = new FormControl('', Validators.required);
  priceControl = new FormControl('', Validators.required);

  constructor(private services: WebServices, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content, flag: boolean): void {
    this.newItem = flag;
    this.services.getAllItemCategories().subscribe(data=>{
      this.itemCategories = data;
    })
    if(flag){
      this.item = new Item();
    }
    this.modalService.open(content, { ariaLabelledBy: 'item-modal' }).result;
  }

  saveItem(item:Item){
    item.itemCategoryId = this.itemCategory.itemCategoryId;
    this.services.addItem(item).subscribe(data=>data);
    this.modalService.dismissAll();
  }
}
