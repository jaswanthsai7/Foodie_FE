import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../model/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Array<Restaurant>> {
    return this.httpClient.get<Array<Restaurant>>('http://localhost:9000/api/v2/getallrestaurants')

  }
  getById(id: number): Observable<Array<Restaurant>> {
    return this.httpClient.get<Array<Restaurant>>('http://localhost:9000/restaurant/' + id)

  }

}
