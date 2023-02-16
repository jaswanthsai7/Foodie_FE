import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from 'src/app/model/menu';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private fb: FormBuilder, private snackBar:MatSnackBar, private adminService: AdminService) { }

  restaurants: any;

  ngOnInit(): void {
    this.restaurant();
  }


  restaurant() {
    this.adminService.getAll().subscribe(data => {
      this.restaurants = data;
      // console.log("data is "+
      // JSON.stringify(this.restaurants));
    });
  }


  // fetchRestaurants() {
  //   this.restaurantService.get().subscribe((value) => {
  //     this.restaurants = value;
  //   })
  // }


  formData = new FormData;
  registrationForm = this.fb.group({
    restaurantName: ['', Validators.required],
    description: ['', Validators.required],
    city: ['', Validators.required],
  })

  formData1 = new FormData;
  menuList = this.fb.group({
    itemName: ['',],
    description: [''],
    quantity:[],
    itemPrice: []
  })


  func1(registrationForm: any) {
    const restaurantName = this.registrationForm.get('restaurantName')?.value
    const description = this.registrationForm.get('description')?.value
    const city = this.registrationForm.get('city')?.value
    // console.log(this.registrationForm.get('description')?.value)
    // console.log(this.registrationForm.get('city')?.value)
    // console.log(this.registrationForm.get('restaurantName')?.value)
    if (restaurantName == null || description == null || city == null) {
      alert("fields are empty")
    } else {
      this.formData.append("restaurant", JSON.stringify(registrationForm.value))
      console.log(this.registrationForm.value)
      console.log(this.formData)
      this.adminService.saveRestaurant(this.formData).subscribe({
        next: data => {
          // console.log("data is " + JSON.stringify(data));
          this.restaurant();
          this.snackBar.open("Restaurant Added", "Successfully", {
            duration: 2000,
          });
        }, error: e => { alert("Unable to add restaurant, please check the image") }
      });
      this.restaurant();
      this.reset();
    }
  }


  @ViewChild('myInput1')
  myInputVariable: any;
  reset() {
    // this.registrationForm.reset()
    this.myInputVariable.nativeElement.value = "";
    this.formData.delete('file')
    this.formData.delete('restaurant')
    console.log(this.formData.get('file')?.valueOf())
  }


  onFileSelect(event: any) {
    let file: any = event.target.files[0];
    console.log(file);
    this.formData.append("file", file);
  }


  isDisplay = true
  displaySave() {
    this.isDisplay = !this.isDisplay
  }


  data: Menu = {
    itemName: undefined,
    description: undefined,
    itemPrice: undefined,
    quantity: undefined
  };


  // func2(form: any) {
  //   const fi = this.menuList.get('itemName')?.value
  //   const la = this.menuList.get('itemPrice')?.value
  //   const user = this.menuList.get('itemImage')?.value
  //   this.data.itemName = fi;
  //   this.data.itemPrice = la;

  //   console.log(this.data)
  //   this.adminService.updateMenu(this.data,).subscribe(data => {
  //     console.log("data is "+data);
  //   })
  // }


  isDisplayMenu = true
  displaySaveMenu() {
    this.isDisplayMenu = !this.isDisplayMenu
  }


  deleteRestaurant(id: string) {
    console.log(id)
    window.confirm("Are you sure you want to delete Restaurant?")
    this.adminService.delete(id).subscribe({
      next: data => {
        console.log(data);
        this.restaurant();
        this.snackBar.open("Restaurant Deleted", "Successfully", {
          duration: 2000,
        });
        
      }, error: e => { alert("Unable to delete restaurant") }
    });
   
    // this.ngOnInit();
    this.restaurant();
  }
}
