import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../models/Item';
import { WebServices } from '../services/web.services';
import { Side } from '../models/Side';

@Component({
    selector: 'management-modal',
    templateUrl: './management.html',
    styleUrls: ['../categories/dishes.component.css', '../global-layout.css']
})
export class ManagementModal implements OnInit {
    sides: Side[];
    flag: string = '';
    side: Side[];

    constructor(private services: WebServices, private modalService: NgbModal){}


    ngOnInit(): void {
        this.services.getAllSides().subscribe(data=>{
            this.sides=data;
            console.log(data)
        })
    }

    open(content, flag:string): void {
        this.flag = flag;
        this.modalService.open(content, { ariaLabelledBy: 'management-modal' }).result;
      }

      deleteUser(side){}

      editUser(side){}
}