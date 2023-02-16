import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {
  

  constructor(private httpClient :HttpClient,private route: Router) { }

  isLoggedIn:boolean=false;
  isAdmin:boolean=false;

  register(user:any):Observable<any>{
    return this.httpClient.post<any>("http://localhost:9000/api/v1/save",user);
  }

  loginCheck(user:any){
    return this.httpClient.post<any>("http://localhost:9000/api/v1/login",user)
  }
  getUser(email:string|null):Observable<User>{
    
    return this.httpClient.get<User>("http://localhost:9000/api/v1/getuser/"+email)

  }
  getOrders(email:string|null):Observable<any>{
    
    return this.httpClient.get<any>("http://localhost:9000/api/v4/getuser/"+email)

  }
  

  // isLoggedIn(){
  //   let token = localStorage.getItem('token')
  //   if(token==null||token==''){
  //     return false;
  //   }
  //   else{
  //     return true;
  //   }
  // }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.route.navigateByUrl('home');  
  }
}
