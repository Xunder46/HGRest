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

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'login', component: UserComponent},
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