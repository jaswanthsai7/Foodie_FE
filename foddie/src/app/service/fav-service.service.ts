import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavServiceService implements OnInit {

  ngOnInit(): void {
  this.captureEmail = localStorage.getItem('email');
   }
  
  constructor(private httpClient :HttpClient) { }

  captureEmail:any= localStorage.getItem('email');

  saveFavRest(restaurant:any){
    return this.httpClient.put<any>("http://localhost:9000/api/v3/saveFavRestaurant/" + this.captureEmail ,restaurant)
  }

  saveFavDish(dish:any){
    return this.httpClient.put<any>("http://localhost:9000/api/v3/saveFavDish/" + this.captureEmail ,dish)
  }

//change name
  getUser(email:any):Observable<Array<any>> {
    return this.httpClient.get<Array<any>>("http://localhost:9000/api/v3/getFavRestaurant/"+email)

  }


  getFavDish(email:any):Observable<Array<any>>{
    return this.httpClient.get<Array<any>>("http://localhost:9000/api/v3/getFavDish/"+email)
  }


  removeFavRest(restaurantName:any,email:any){
    return this.httpClient.delete("http://localhost:9000/api/v3/removeFavRestaurant/"+restaurantName+"/"+email)
  }

  removeFavDish(dishName:any,email:any){
    return this.httpClient.delete("http://localhost:9000/api/v3/removeFavDish/"+dishName+"/"+email)
  }


  setEmailId(emailId:any){
    localStorage.setItem('email',emailId)
  }

  saveOrder(dish:any){
    return this.httpClient.post<any>("http://localhost:9000/api/v2/saveorder",dish)
  }


}
