import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserauthService } from 'src/app/service/userauth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private userauth: UserauthService) { }

  user: User = {
    emailId: '',
    profilePic: undefined,
    firstName: '',
    lastName: '',
    password: '',
    contactNumber: 0
  };
  orders1: any[] = [];
  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    let email = localStorage.getItem('email');
    this.userauth.getUser(email).subscribe(x => {
      this.user = x;
      console.log(x)
    })
    this.userauth.getOrders(email).subscribe(x => {
      this.orders1 = x.orders;
      console.log(x.orders)
    })
    this.it()
  }


  it() {
    for (let index = 0; index < this.orders1.length; index++) {
      const element = this.orders1[index];
      console.log(element)
    }
  }
}
