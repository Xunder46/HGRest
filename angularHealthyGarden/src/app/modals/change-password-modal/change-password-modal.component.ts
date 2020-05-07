import { Component, OnInit, Input } from '@angular/core';
import { WebServices } from 'src/app/services/web.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./../../account/account/account.component.css']
})
export class ChangePasswordModalComponent implements OnInit {
  manageOptions: any[] = ["Change password", "Update phone number"]

  manageOptionsControl = new FormControl('', Validators.required);
  oldPasswordInputControl = new FormControl('', Validators.required);
  newPasswordInputControl = new FormControl('', Validators.required);
  confirmNewPasswordInputControl = new FormControl('', Validators.required);
  phonenumberInputControl = new FormControl('', Validators.required);
  usernameInputControl = new FormControl('', Validators.required);

  chosenOption: any;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  @Input() username: string;
  @Input() phonenumber: string;
  

  constructor(private modalService: NgbModal, private services: WebServices, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'change-password-modal' }).result;
  }

  onOptionChange(){

  }

  changePassword(){
    let passwordForm: any = {
      username: this.username,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmNewPassword
    }
    this.services.changePassword(passwordForm).subscribe((data)=>
    data,
    (err) => {
      this.toastr.warning("Something went wromg", "Error!",{
        closeButton: true,
        progressBar: false,
        positionClass: "toast-top-full-width",
        timeOut: 3000,
        extendedTimeOut: 2000
      });
    },
    () => {
      this.modalService.dismissAll();
      this.toastr.success("", "You have successfully updated your password!",{
        closeButton: true,
        progressBar: false,
        positionClass: "toast-top-full-width",
        timeOut: 3000,
        extendedTimeOut: 2000
      });
    });
  }

  updateInfo(){
    let user = {
      username: this.username,
      phonenumber: this.phonenumber
    }
    this.services.updateUser(user).subscribe((data)=>
    data,
    (err) => {
      this.toastr.warning("Something went wromg", "Error!",{
        closeButton: true,
        progressBar: false,
        positionClass: "toast-top-full-width",
        timeOut: 3000,
        extendedTimeOut: 2000
      });
    },
    () => {
      this.modalService.dismissAll();
      this.toastr.success("Changes will apply when you log in again", "You have successfully updated your phone number!",{
        closeButton: true,
        progressBar: false,
        positionClass: "toast-top-full-width",
        timeOut: 3000,
        extendedTimeOut: 2000
      });
    });
  }
}
