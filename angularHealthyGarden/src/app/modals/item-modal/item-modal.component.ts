import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { WebServices } from 'src/app/services/web.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css', './../../global-layout.css']
})
export class ItemModalComponent implements OnInit {
  @Input() item: Item;

  newItem: boolean = true;

  constructor(private services: WebServices, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content, flag: boolean): void {
    this.modalService.open(content, { ariaLabelledBy: 'item-modal' }).result;
  }

  saveItem(item:Item){

  }
}
