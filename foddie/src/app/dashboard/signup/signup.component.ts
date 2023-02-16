import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserauthService } from 'src/app/service/userauth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  addressForm = this.fb.group({
    firstName: [null, [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z,.!?\\s-]*$')]],
    lastName: [null, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z,.!?\\s-]*$')]],
    contactNumber: [null, [Validators.required, Validators.pattern("[0-9 ]{10}")]],
    emailId: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(4)]],
    // confirmPassword: [null, [Validators.required, Validators.minLength(4)]],
    role: ["user", Validators.required]
  });


  constructor(private fb: FormBuilder, private route: Router, private snackBar: MatSnackBar, private userService: UserauthService) { }
  formData = new FormData;
  hide = true;
  onSubmit() {
    console.log(this.addressForm.value);

    this.formData.append("user", JSON.stringify(this.addressForm.value))

    this.userService.register(this.formData).subscribe({
      next: data => {

        console.log("data is " + data);
        alert("user registered successfully")
        this.route.navigateByUrl("login");
      }, error: e => { alert("Unable to register !Please check Image") }
    });

  }

  onFileSelect(event: any) {

    let file: any = event.target.files[0];

    console.log(file);

    this.formData.append("file", file);
    this.snackBar.open("Profile Image Uploaded", "Successfully", {
      duration: 1500,
    });

  }


  ngOnInit(): void {
  }


}
