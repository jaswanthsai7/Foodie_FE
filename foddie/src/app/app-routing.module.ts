import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './dashboard/admin/admin.component';
import { UpdatemenuComponent } from './dashboard/admin/updatemenu/updatemenu.component';
import { UpdaterestaurantComponent } from './dashboard/admin/updaterestaurant/updaterestaurant.component';
import { ViewmenuComponent } from './dashboard/admin/viewmenu/viewmenu.component';
import { HomeComponent } from './dashboard/home/home.component';
import { LoginComponent } from './dashboard/login/login.component';
import { NotFoundComponent } from './dashboard/not-found/not-found.component';
import { OrdersComponent } from './dashboard/restaurant/orders/orders.component';
import { RestaurantComponent } from './dashboard/restaurant/restaurant.component';
import { ViewComponent } from './dashboard/restaurant/view/view.component';
import { SignupComponent } from './dashboard/signup/signup.component';
import { UserFavouriteComponent } from './dashboard/user-favourite/user-favourite.component';
import { ProfileComponent } from './header/profile/profile.component';
import { AuthGuardGuard } from './service/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch:'full'
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'signup',
    component:SignupComponent
  },
  {
    path: 'favorite',
    component:UserFavouriteComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'restaurant',
    component:RestaurantComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'profile',
    component:ProfileComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'restaurant/view/:id',
    component:ViewComponent
  },
  {
    path: 'admin',
    component:AdminComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'admin/view/:id',
    component:ViewmenuComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'admin/updatemenu/:id',
    component:UpdatemenuComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'admin/viewmenu/:id',
    component:ViewmenuComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'admin/updaterestaurant/:id',
    component:UpdaterestaurantComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: 'restaurant/view/:id/orders',
    component:OrdersComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"**",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
