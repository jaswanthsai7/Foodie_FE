import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  URL: string = "http://localhost:9000/api/v2/ad/saverestaurant"

  saveRestaurant(form: any): Observable<any> {
    console.log(form.value)
    return this.http.post<any>(this.URL, form)
  }
  updateMenu(form: any, id: string): Observable<any> {
    console.log(form.value)
    return this.http.put<any>("http://localhost:9000/api/v2/ad/updatemenu/" + id, form)
  }
  getAll(): Observable<any> {
    return this.http.get<any>("http://localhost:9000/api/v2/ad/getallrestaurants")
  }
  updateRestaurant(form: any): Observable<any> {
    console.log(form.value)
    return this.http.put<any>("http://localhost:9000/api/v2/ad/updaterestaurant", form)
  }
  delete(id: string): Observable<any> {
    console.log(id)
    return this.http.delete<any>("http://localhost:9000/api/v2/ad/delete/" + id)
  }

  deleteMenu(menu: any, id: string): Observable<any> {
    return this.http.put<any>("http://localhost:9000/api/v2/ad/deletemenu/" + id, menu)
  }

}
