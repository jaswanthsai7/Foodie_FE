import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Restaurant } from 'src/app/model/restaurant.model';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { Menu } from '../restaurant/view/view.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cities: City[] = [{ name: "Pune" },
    { name: "Delhi" }, { name: "Mumbai" }, { name: "Bengaluru"},{ name:"Hyderabad"}]
  
  city: string = "";
  search: Restaurant[] = [];

  constructor(private restaurantService:RestaurantService){}

  setCity(city: string) {
    if (city) {
      localStorage.setItem('city',city)
    //  window.location.reload() 
    this.ngOnInit();
    this.getCity();
    this.getAll();
    }
  }
  log(value:City|null) {
    console.log(value?.name)
  }
  getCity() {
    let city = localStorage.getItem('city');
    if (city) {
      this.city = city;
      setTimeout(() => {
        const select = document.getElementById(this.city);
      select?.setAttribute('selected', 'selected');
      },1500)
      
    }
  }

  updateCity() {
    this.city = (document.getElementById('cities') as HTMLSelectElement).value;
    this.setCity(this.city);
  }

  getAll() {
    this.restaurantService.get().subscribe(value=>{
      this.search=value.filter(x=> x.city===this.city)
    })
  }

  searchData() {
    let restaurant = (document.getElementById('search-bar') as HTMLInputElement).value;
    this.restaurantService.get().subscribe(value => {
      this.search = value.filter(x => x.city === this.city);
      this.search = this.search.filter(x => x.restaurantName.toLowerCase().startsWith(restaurant.toString().toLowerCase()))
        console.log(this.search);
    })    
  }

  ngOnInit() {
    this.getCity();
    this.getAll();
  }

}

export interface City {
  name: string
  
}
