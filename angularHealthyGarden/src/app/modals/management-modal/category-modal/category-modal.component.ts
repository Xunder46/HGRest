import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { WebServices } from 'src/app/services/web.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css', './../../../global-layout.css']
})
export class CategoryModalComponent implements OnInit {

  newCategory: boolean = true;

  @Input() category: Category;

  categoryNameControl = new FormControl('', Validators.required);

  constructor(private services: WebServices, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  open(content, flag: boolean): void {
    this.newCategory = flag;
    if(flag){
      this.category = new Category();
    }
    this.modalService.open(content, { ariaLabelledBy: 'category-modal' }).result;
  }

  saveCategory(category: Category){
    category.active = true;
    this.services.addCategory(category).subscribe(data=>data, (err)=>err, () => this.toastr.success("Success!"));
    this.modalService.dismissAll();
  }
}
