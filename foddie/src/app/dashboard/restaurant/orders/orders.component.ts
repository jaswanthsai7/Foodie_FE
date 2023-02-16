import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { FavServiceService } from 'src/app/service/fav-service.service';
import { Menu } from '../view/view.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  

  constructor(private dataService: DataService, private snackBar: MatSnackBar, private fb: FormBuilder, private route: Router, private fav: FavServiceService) {
   
   }


  ngOnInit(): void {
    this.getOrders();
  }
  totalprice: number = 0;
  orders: Menu[] = [];
  getOrders() {
    this.totalprice = 0;
    this.orders = this.dataService.orders;
    this.dataService.orders.forEach((order)=> this.totalprice += (order.itemPrice * order.quantity))
  }

  addQuantity(order: Menu) {
    const index = this.dataService.orders.findIndex((item)=> item.itemName === order.itemName)
    this.dataService.orders[index].quantity += 1;
    this.totalprice += order.itemPrice;
  }

  removeItem(order: Menu) {

    if(order.quantity === 1){
      this.dataService.orders = this.orders.filter(x =>
        x.itemName !== order.itemName)
    }else {
      const index = this.dataService.orders.findIndex((item)=> item.itemName === order.itemName);
      this.dataService.orders[index].quantity -=1;
    }   
    this.getOrders(); 

  }
  sum: number = 0;
  email: any = localStorage.getItem('email');
  date:Date = new Date();


  // get items() {
  // 	return this.orderForm.get('items') as FormGroup;
  // }

  order(order: any) {
    // this.sum = this.sum + order.itemPrice
    this.orderForm.patchValue({
      totalAmount: this.totalprice
    })
    console.log(this.sum)
    return this.fb.group({
      itemName: [order.itemName],
      itemPrice: [order.itemPrice],
      description:[order.description],
      quantity:[order.quantity]
    })
  }


  addOrders() {
    const cont = <FormArray>this.orderForm.controls['items'];
    for (let index = 0; index < this.orders.length; index++) {
      const val = this.order(this.orders[index])
      cont.push(val)
    }
  }
  orderForm = this.fb.group({
    userEmailId: [this.email],
    items: this.fb.array([]),
    date:[this.date],
    address: this.fb.group({
      addressType: ['home', Validators.required],
      streetName: ['', Validators.required],
      city: ['', Validators.required],
      pinCode: [null, Validators.required, Validators.pattern("[0-9]{6}")]
    }),
    totalAmount: [this.sum]

  })

  saveOrder(orderForm: FormGroup) {
    console.log(orderForm);
    const streetName = orderForm.get('address.streetName')?.value
    const city = orderForm.get('address.city')?.value
    const pinCode = orderForm.get('address.pinCode')?.value
    var result = confirm("You want to place Order");
    console.log(orderForm.value);
    
    if (result) {
      if (streetName == '' || city == '' || pinCode == null) {
        alert("Address fields are empty")
      }
      else {
        this.addOrders();
        console.log(this.orderForm.value);
        this.fav.saveOrder(this.orderForm.value).subscribe({
          next: data => {
            this.snackBar.open("Successfully", "Ordered", {
              duration: 1500,
            });
            this.dataService.orders = []
            console.log(data);
            
          }, error: e => {
            alert("Unable to Place Order !!Please try again")
          }
        });
        // this.orderForm.reset();
        // this.route.navigateByUrl('/restaurant')
        this.route.navigate(['restaurant'])
      }
    } else {
      console.log("aborted")
    }
  }
}
