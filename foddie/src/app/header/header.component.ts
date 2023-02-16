import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService, Menu } from '../service/data.service';
import { UserauthService } from '../service/userauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userAuth: UserauthService, private dataService: DataService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.checkLogin();
  }
  isLoggedIn: boolean = false;
  isAdmin:boolean = false;

  favorite: Number = 0;

  logout() {
    var result = confirm("You want to logout?")
    if (result) {
      this.dataService.orders = [];
      this.userAuth.logout();
      this.userAuth.isLoggedIn = false;
      this.isLoggedIn = false;
      this.checkLogin();
      this.snackBar.open(" Successfully", " LoggedOut", {
        duration: 1000,
      });
      
    }
    else {
      console.log('aborted')
    }
  }
  checkLogin() {
    setInterval(() => {
      this.isLoggedIn = this.userAuth.isLoggedIn;
      this.isAdmin = this.userAuth.isAdmin;
    }, 300)
  }

  fetchOrder() {
    setInterval(() => {
      this.favorite = 0;
      this.favorite = this.dataService.favoriteRestaurant.length + this.dataService.favoriteDish.length;
    }, 500)
  }}
