import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './dashboard/login/login.component';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './dashboard/home/home.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SignupComponent } from './dashboard/signup/signup.component';
import { RestaurantComponent } from './dashboard/restaurant/restaurant.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './dashboard/restaurant/view/view.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AdminComponent } from './dashboard/admin/admin.component';
import { ViewmenuComponent } from './dashboard/admin/viewmenu/viewmenu.component';
import { UpdatemenuComponent } from './dashboard/admin/updatemenu/updatemenu.component';
import { UpdaterestaurantComponent } from './dashboard/admin/updaterestaurant/updaterestaurant.component';
import { OrdersComponent } from './dashboard/restaurant/orders/orders.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { UserFavouriteComponent } from './dashboard/user-favourite/user-favourite.component';
import { ProfileComponent } from './header/profile/profile.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NotFoundComponent } from './dashboard/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    RestaurantComponent,
    ViewComponent,
    AdminComponent,
    ViewmenuComponent,
    UpdatemenuComponent,
    UpdaterestaurantComponent,
    OrdersComponent,
    UserFavouriteComponent,
    ProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
