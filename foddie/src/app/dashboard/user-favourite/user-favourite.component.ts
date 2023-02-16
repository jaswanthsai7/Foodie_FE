import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavServiceService } from 'src/app/service/fav-service.service';

@Component({
  selector: 'app-user-favourite',
  templateUrl: './user-favourite.component.html',
  styleUrls: ['./user-favourite.component.scss']
})
export class UserFavouriteComponent {

  constructor(private favservice: FavServiceService, private snackBar: MatSnackBar) { }

  favRes: any[] = []
  favDish: any[] = []
  emailId: any
  displayRestaurant: boolean | undefined;

  ngOnInit(): void {
    this.emailId = localStorage.getItem('email')
    this.getAllFavRest();
    this.getAllFavDish();
  }



  getAllFavRest() {

    this.favservice.getUser(this.emailId).subscribe(
      data => {
        this.favRes = data;
      }
    )

  }


  getAllFavDish() {
    this.favservice.getFavDish(this.emailId).subscribe({
      next:
        data => {
          this.favDish = data;
        }, error: e => { alert("Unable to fetch Dishes") }
    });

  }


  removeFavRestaurant(restaurantName: any) {
    let result = confirm("you want to remove Restaurant?")
    if (result) {
      this.favservice.removeFavRest(restaurantName, this.emailId).subscribe({
        next:
          data => {
            console.log(data);
            this.ngOnInit();
            this.snackBar.open("Removed Restaurant", "Successfully", {
              duration: 2000,
            });
          }, error: e => { alert("Unable to remove restaurant") }
      });
      this.getAllFavDish()
      this.getAllFavRest()
    } else {
      console.log("aborted")
    }
  }


  removeFavDish(dishName: any) {
    let result = confirm("you want to remove dish?")
    if (result) {
      this.favservice.removeFavDish(dishName, this.emailId).subscribe({
        next: (data) => {
          this.ngOnInit()
          console.log(data)
          this.snackBar.open("Removed Dish", "Successfully", {
            duration: 2000,
          });
        }, error: e => { alert("Unable to remove Dish") }
      });
      this.getAllFavDish()
      this.getAllFavRest()
    } else {
      console.log("aborted")
    }
  }
}
