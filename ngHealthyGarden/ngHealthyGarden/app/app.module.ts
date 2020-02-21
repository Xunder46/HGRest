import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { WebServices } from './web.services'
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule,
        FormsModule
    ],
    providers: [
        WebServices,
        { provide: APP_BASE_HREF, useValue: '/' }
    ],
    declarations: [
        AppComponent, MenuComponent, WelcomeComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
