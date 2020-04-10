import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { DishesComponent } from './Categories/dishes.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ManagerOfficeComponent } from './manager-office/manager-office.component';
import { UserComponent } from './user/user.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AccountComponent } from './account/account/account.component';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'account', canActivate: [AuthGuard], component: AccountComponent},
    { 
        path: 'login', component: UserComponent,
        children: [{path: '', component: LogInComponent}]
    },
    { 
        path: 'signup', component: UserComponent,
        children: [{path: '', component: SignUpComponent}]
    },
    { path: 'shoppingcart', component: ShoppingCartComponent },
    { path: 'manager', component: ManagerOfficeComponent},
    { path: 'menu', component: MenuComponent },
    { path: ':category', component: DishesComponent }
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