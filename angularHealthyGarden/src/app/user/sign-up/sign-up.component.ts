import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { WebServices } from 'src/app/services/web.services';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./../../../../node_modules/materialize-css/dist/css/materialize.min.css', './../user.component.css']
})
export class SignUpComponent implements OnInit {
  errorMessage: string;
  hide = true;
  user: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  @Output() message: EventEmitter<string> = new EventEmitter();

  constructor(private services: WebServices) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    }
  }

  OnSubmit(form: NgForm) {
    this.user.confirmPassword = this.user.password;
    this.services.signup(this.user).pipe(
      retry(0),
      catchError(this.handleError)
    ).subscribe(data=>data)
    this.resetForm();
  }

  handleError = (error) => {
    if (error.error instanceof ErrorEvent) {
      // client-side error
      this.errorMessage = `Error: ${error.error.modelState.createUserModel.Email[0]}`;
      this.message.emit(this.errorMessage)
    } else {
      // server-side error
      this.errorMessage = error.error.modelState["createUserModel.Email"][0].replace(['"'], '');
      this.message.emit(this.errorMessage)
    }
    return throwError(this.errorMessage);
  }

} 