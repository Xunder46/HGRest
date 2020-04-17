import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  message: string;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  getErrorMessage(message: string){
    this.message = message.replace(/['"]+/g, '');
  }

  back(){
    this.route.navigate(['']);
  }
}
