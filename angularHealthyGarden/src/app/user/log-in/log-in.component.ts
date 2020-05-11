import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebServices } from 'src/app/services/web.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./../../../../node_modules/materialize-css/dist/css/materialize.min.css', './../user.component.css']
})
export class LogInComponent implements OnInit {
  errorMessage: string[];
  hide = true;
  user: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  response: HttpErrorResponse;
  userInfo: User;

  @Output() messages: EventEmitter<string[]> = new EventEmitter();

  constructor(private services: WebServices, private router: Router) { }

  ngOnInit(): void {
    this.resetForm();
    if (localStorage.getItem("user")) {
      this.services.getUserInfo().subscribe(data => {
        if (data&&data.roleName == 'Manager') {
          this.router.navigate(['/manager']);
        }
        else {
          this.router.navigate(['/account']);
        }
      })
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      username: '',
      password: '',
    }
  }

  OnSubmit(form: NgForm) {
    this.services.login(this.user.username, this.user.password).pipe(
      retry(0),
      catchError(this.handleError)
    ).subscribe((data: any) => {
      if (data) {
        let token = data.access_token;
        let now = new Date().getTime();
        let user = {
          token: token,
          logInTime: now
        }
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
      (err) => {
      },
      () => {
        if (localStorage.getItem("user")) {
          this.services.getUserInfo().subscribe(data => {
            this.userInfo = data;
            if (this.userInfo.roleName == 'Manager') {
              this.router.navigate(['/manager']);
            }
            else {
              this.router.navigate(['/account']);
            }
          })
        }
      })
    this.resetForm(form);
  }

  handleError = (error) => {
    this.errorMessage = [];
    if (error.error instanceof ErrorEvent) {
      // client-side error
      this.errorMessage.push(`Error: ${error.error.error_description}`);
      this.messages.emit(this.errorMessage)
    } else {
      // server-side error
      this.errorMessage.push(error.error.error_description);
      this.messages.emit(this.errorMessage)
    }
    return throwError(this.errorMessage);
  }
}
