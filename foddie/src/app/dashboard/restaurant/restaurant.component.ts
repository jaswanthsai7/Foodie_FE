import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { Restaurant } from 'src/app/model/restaurant.model';
import { FavServiceService } from 'src/app/service/fav-service.service';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, private favService: FavServiceService, private route: Router, private snackBar: MatSnackBar) { }

  restaurants: any[] = [];
  newRestaurants: any[] = [];
  ngOnInit(): void {
    this.fetchRestaurants();

  }

  fetchRestaurants() {
    this.restaurantService.get().subscribe({
      next: (value) => {
        this.restaurants = value;
        this.newRestaurants = value;
      }, error: e => {
        alert("Unable to Fetch Restaurants")
      }
    });
  }

  status: boolean = true;
  item: any;
  clickEvent(event: any) {
    this.status = !this.status;
    if (this.status) { this.item = "add"; } else { this.item = "favorite"; }
    console.log(this.status)
  }
  isActive4 = false;
  section4Click() {
    this.isActive4 = !this.isActive4;
  }

  addFav(restaurant: any) {
    this.favService.saveFavRest(restaurant).subscribe({
      next: data => {
        console.log(data)
        this.snackBar.open("Favourite Restaurant", "Added", {
          duration: 1000,
        });
      }, error: e => {
        this.snackBar.open("Favourite Restaurant", "Already Exists", {
          duration: 2000,
        });
      }
    });
  }

  searchData() {
    let restaurantNames = (document.getElementById('search-bar') as HTMLInputElement).value;
    this.restaurants = this.newRestaurants;
    this.restaurants = this.restaurants.filter(x => x.restaurantName.toLowerCase().startsWith(restaurantNames.toString().toLowerCase()))
    console.log(this.restaurants);

  }
}
