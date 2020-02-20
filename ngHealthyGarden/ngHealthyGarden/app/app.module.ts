import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { WebServices } from './web.services'
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule
    ],
    providers: [
        WebServices
    ],
    declarations: [
        AppComponent, MenuComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
