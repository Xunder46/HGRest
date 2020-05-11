import { Component, OnInit, Input } from '@angular/core';
import { Side } from 'src/app/models/Side';
import { WebServices } from 'src/app/services/web.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/Category';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'side-modal',
  templateUrl: './side-modal.component.html',
  styleUrls: ['./side-modal.component.css', './../../../global-layout.css']
})
export class SideModalComponent implements OnInit {

  newSide:boolean = true;

  allCategories: Category[];
  category: Category;

  @Input() side: Side;

  categoryControl = new FormControl('', Validators.required);
  priceControl = new FormControl('', Validators.required);
  sideNameControl = new FormControl('', Validators.required);


  constructor(private services: WebServices, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  saveSide(side: Side){
    side.categoryId = this.category.categoryId;
    side.active = true;
    this.services.addSide(side).subscribe(data=>data, (err)=>err, () => this.toastr.success("Success!"));
    this.modalService.dismissAll();
  }

  open(content, flag: boolean): void {
    this.newSide = flag;
    this.services.getCategories().subscribe(data=>{
      this.allCategories = data;
      this.category = data.find(c=>c.categoryId==this.side.categoryId);    
    })
    if(flag){
      this.side = new Side();
    }
    this.modalService.open(content, { ariaLabelledBy: 'side-modal' }).result;
  }

}
