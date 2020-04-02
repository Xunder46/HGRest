import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { WebServices } from './services/web.services'
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { DishesComponent } from './Categories/dishes.component';
import { SplitPipe } from './split.pipe';
import { NavigationComponent } from './navigation/navigation.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomizeModal } from './modals/customize-modal.component';
import { ManagerOfficeComponent } from './manager-office/manager-office.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ManagementModal } from './modals/management';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LogInComponent } from './user/log-in/log-in.component';

@NgModule({
    imports: [
        MatSelectModule,
        MatCheckboxModule,
        NgbModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        WebServices,
        { provide: APP_BASE_HREF, useValue: '/' }
    ],
    declarations: [
        SplitPipe, 
        AppComponent, 
        MenuComponent, 
        WelcomeComponent, 
        DishesComponent, 
        NavigationComponent, 
        ShoppingCartComponent, 
        CustomizeModal, 
        ManagementModal, 
        ManagerOfficeComponent,
        UserComponent,
        SignUpComponent,
        LogInComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
