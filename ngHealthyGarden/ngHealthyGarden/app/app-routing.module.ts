﻿import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppetizersComponent } from './Categories/Appetizers/appetizers.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent},
    { path: 'menu', component: MenuComponent },
    { path: ':category', component: AppetizersComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        FormsModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }