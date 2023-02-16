import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/model/menu';
import { AdminService } from 'src/app/service/admin.service';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-updatemenu',
  templateUrl: './updatemenu.component.html',
  styleUrls: ['./updatemenu.component.scss']
})
export class UpdatemenuComponent {
  constructor(private route: ActivatedRoute,private snackBar:MatSnackBar, private adminService: AdminService, private restaurantService: RestaurantService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
    })
    this.getRestaurant();
  }


  id: any;
  restaurants: any[] = [];
  menus: Menu[] = [];


  menuList = this.fb.group({
    itemName: ['', Validators.required],
    description: ['',Validators.required],
    itemPrice: [, Validators.pattern('[0-9]+(\\.[0-9][0-9]?)?')]
  })


  getRestaurant() {
    this.adminService.getAll().subscribe({
      next: (value) => {
        this.restaurants = value
        this.restaurants = this.restaurants.filter(restaurant => {
          return this.id.toString() === restaurant.id;
        })
        this.menus = this.restaurants[0].menuList;
      }, error: e => { alert("Unable to get restaurant") }
    });

  }


  // data: Menu = {
  //   itemName: undefined,
  //   itemImage: undefined,
  //   itemPrice: undefined
  // };



  func2(form: any) {
    const itemName = this.menuList.get('itemName')?.value
    const itemPrice = this.menuList.get('itemPrice')?.value
     const description=this.menuList.get('description')?.value
    if (itemName == null || itemPrice == null || description==null) {
      alert("item values cant be null")
    } else {
      // console.log(this.data)
      this.adminService.updateMenu(this.menuList.value, this.id).subscribe({
        next: data => {
          console.log("data is " + data);
          this.getRestaurant();
          this.snackBar.open("Dish Added", "Successfully", {
            duration: 2000,
          });
        }, error: e => { 
          this.snackBar.open("Unable To Add Dish", "Unsuccessful", {
            duration: 2000,
          });
        }
      });
      this.reset();
    }
    this.ngOnInit();
    this.getRestaurant();
  }

  reset() {
    this.menuList.reset();
  }

  deleteMenu(itemName: any) {
    console.log(itemName)
    var result = confirm("are you sure you want to delete dish?")
    if (result) {
      this.menus = this.menus.filter(menu => {
        return menu.itemName != itemName
      })
      console.log(this.menus)
      this.adminService.deleteMenu(this.menus, this.id).subscribe({
        next: data => {
          console.log("data is" + data);
          this.snackBar.open("Deleted The Dish", "Successfully", {
            duration: 2000,
          });
          this.getRestaurant();
        }, error: e => {
          this.snackBar.open("Unable To Delete Dish", "Unsuccessful", {
            duration: 2000,
          });
          }
      });
    }
    this.ngOnInit();
    this.getRestaurant();

  }



}