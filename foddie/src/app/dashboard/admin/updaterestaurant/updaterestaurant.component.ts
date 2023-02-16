import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/model/menu';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-updaterestaurant',
  templateUrl: './updaterestaurant.component.html',
  styleUrls: ['./updaterestaurant.component.scss']
})
export class UpdaterestaurantComponent {
  constructor(private route: ActivatedRoute,private router:Router, private snackBar:MatSnackBar, private adminService: AdminService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
    })
    this.getRestaurant();
  }



  getRestaurant() {
    this.adminService.getAll().subscribe((value) => {
      this.restaurants = value
      this.restaurants = this.restaurants.filter(restaurant => {
        this.restaurant = restaurant;
        return this.id.toString() === restaurant.id;
      })
      this.registrationForm.get("id")?.setValue(this.restaurants[0].id);
      this.registrationForm.get("restaurantName")?.setValue(this.restaurants[0].restaurantName);
      this.registrationForm.get("description")?.setValue(this.restaurants[0].description);
      this.registrationForm.get("city")?.setValue(this.restaurants[0].city);
      this.imageData == this.restaurants[0].restaurantImage
      console.log(this.restaurants[0].restaurantImage.image)
      this.menus = this.restaurants[0].menuList;
    })

  }



  imageData: any;
  id: any;
  restaurant: any;
  restaurants: any[] = [];
  menus: Menu[] = [];



  formData = new FormData;
  registrationForm = this.fb.group({
    id: [''],
    restaurantName: ['', Validators.required],
    description: ['', Validators.required],
    city: ['', Validators.required],
  })
  onFileSelect(event: any) {
    let file: any = event.target.files[0];
    console.log(file);
    this.formData.append("file", file);
  }

  
  func1(registrationForm: any) {
    const restaurantName = this.registrationForm.get('restaurantName')?.value
    const description = this.registrationForm.get('description')?.value
    const city = this.registrationForm.get('city')?.value
    if (restaurantName == null || description == '' || city == '') {
      alert("fields are empty")
    } else {
      this.formData.append("restaurant", JSON.stringify(registrationForm.value))
      console.log(this.registrationForm.value)
      console.log(this.formData)
      this.adminService.updateRestaurant(this.formData).subscribe({
        next: data => {
          console.log("data is " + JSON.stringify(data));
          //  alert("Restaurant Updated");
          this.snackBar.open("Restaurant Updated", "Successfully", {
            duration: 2000,
          });
          
        }, error: e => { alert("Unable to update restaurant") }
      });
      this.reset();
    }
  }


  reset() {
    this.registrationForm.reset();
  }

}
