import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./../global-layout.css', './user.component.css']
})
export class UserComponent implements OnInit {
  messages: string[];

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  getErrorMessage(_messages: string[]){
    this.messages = [];
    this.messages= _messages;
  }

  back(){
    this.route.navigate(['']);
  }
}
