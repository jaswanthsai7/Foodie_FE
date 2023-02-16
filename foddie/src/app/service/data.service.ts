import { Injectable } from '@angular/core';
import { Restaurant } from '../model/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  orders: Menu[] = [];
  favoriteRestaurant: Restaurant[] = [];
  favoriteDish: Menu[] = [];
  price: Number = 0;
  
}
export interface Menu{
  itemName:string,
  itemPrice:number,
  description: string,
  quantity:number
}
