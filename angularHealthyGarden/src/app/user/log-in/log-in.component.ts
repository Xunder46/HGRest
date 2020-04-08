import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./../../../../node_modules/materialize-css/dist/css/materialize.min.css', './log-in.component.css', './../sign-up/sign-up.component.css']
})
export class LogInComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor() { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      role: '',
      customerInfoId: 0
    }
  }

  OnSubmit(form: NgForm) {
    console.log(this.user)
  }
}
