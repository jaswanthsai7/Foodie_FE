import { state } from '@angular/animations';
import { Statement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { interval } from 'rxjs';
import { Restaurant } from 'src/app/model/restaurant.model';
import { DataService } from 'src/app/service/data.service';
import { FavServiceService } from 'src/app/service/fav-service.service';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { UserauthService } from 'src/app/service/userauth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authentication: UserauthService, private restaurantService: RestaurantService, private dataService: DataService, private favservice: FavServiceService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
    })
    this.getRestaurant();
    this.getOrder();

  }
  id: any;
  restaurants: Restaurant[] = [];
  menus: Menu[] = [];
  newMenu: Menu[] = [];
  orders: Menu[] = [];
  totalPrice: number = 0;
  items: number = 0;

  getRestaurant() {
    this.restaurantService.get().subscribe({
      next: (value) => {
        this.restaurants = value
        this.restaurants = this.restaurants.filter(restaurant => {
          return this.id.toString() === restaurant.id;
        })
        this.menus = this.restaurants[0].menuList;
        this.newMenu = this.restaurants[0].menuList;
      }, error: e => {
        alert("Unable to fetch dishes")
      }
    })

  }


  addOrder(menu: Menu) {
    console.log(menu)
    const index = this.dataService.orders.findIndex((order) => order.itemName === menu.itemName);
    if (index !== -1) {
      this.dataService.orders[index].quantity += 1
    } else {
      menu.quantity = 1;
      this.dataService.orders.push(menu);
    }
    this.items++;
    this.totalPrice += menu.itemPrice;

  }

  removeOrder(menu: Menu) {

    const index = this.dataService.orders.findIndex((order) => order.itemName === menu.itemName);

    if (index !== -1) {
      if (this.dataService.orders[index].quantity === 1) {
        this.dataService.orders.splice(index, 1);
        this.menus[this.menus.findIndex((p) => p.itemName === menu.itemName)].quantity = 0
      } else {
        this.dataService.orders[index].quantity = this.dataService.orders[index].quantity - 1;
      }
      this.items--;
      this.totalPrice -= menu.itemPrice;

    }
  }

  // fetchPrice() {
  //   if (this.orders.length > 0) {
  //     this.orders.forEach(element => {
  //       this.totalPrice += element.itemPrice;
  //       this.totalPrice = Math.round(this.totalPrice * 100) / 100;
  //     });
  //   }
  // }

  getOrder() {
    setInterval(() => {
      this.orders = this.dataService.orders;
    }, 500)
  }


  addFavDish(menu: any) {
    var result = this.authentication.isLoggedIn
    if (result) {
      this.favservice.saveFavDish(menu).subscribe({
        next: data => {
          this.snackBar.open("Favourite Dish", "Added", {
            duration: 1000,
          });
        }, error: e => {
          this.snackBar.open("Favourite Dish", "Already Exists", {
            duration: 2000,
          });
        }
      });
    } else {
      this.router.navigateByUrl('login');
    }
  }

  checkExistingOrder() {
    if (this.authentication.isLoggedIn) {
      if (this.dataService.orders.length > 0) {
        this.router.navigate([this.router.url + '/orders']);
      }
    }
    else {
      localStorage.setItem('redirectURL', this.router.url);
      this.router.navigate(['login']);
    }
  }

  searchData() {
    let menuItem = (document.getElementById('search-bar') as HTMLInputElement).value;
    this.menus = this.newMenu;
    this.menus = this.menus.filter(x => x.itemName.toLowerCase().startsWith(menuItem.toString().toLowerCase()))
    console.log(this.menus);

  }

}
export interface Menu {
  itemName: string,
  itemPrice: number,
  description: string,
  quantity: number
}
