import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { FavServiceService } from 'src/app/service/fav-service.service';
import { UserauthService } from 'src/app/service/userauth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  ngOnInit(): void {
  }

  hide = true;

  constructor(private fb: FormBuilder, private favservice: FavServiceService, private service: UserauthService, private route: Router, private snackBar: MatSnackBar, private router:ActivatedRoute) { }

  userLoginForm = this.fb.group({
    emailId: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    // role: ['user']
  })



  submit() {

    this.service.loginCheck(this.userLoginForm.value).subscribe({
      next: data => {

        this.favservice.setEmailId(this.userLoginForm.value.emailId);
        this.favservice.captureEmail = this.userLoginForm.value.emailId
        this.service.isLoggedIn = true;

        if (data.token) {

          console.log(data.message);

          this.service.isAdmin = true;
          localStorage.setItem('token', data.token)


          this.route.navigate(['admin'])
          this.snackBar.open("Admin Successfully ", "LoggedIn", {
            duration: 1000,
          });

        }
        else {
          this.service.isAdmin = false;
          const redirect  = localStorage.getItem('redirectURL');
          if (redirect) {
            localStorage.removeItem('redirectURL')
            this.route.navigate([redirect+'/orders']);
          }
          else {
            this.route.navigate(['restaurant'])
          }
          this.snackBar.open("User Successfully", "LoggedIn", {
            duration: 1000,
          });
        }

      }, error: e => { alert("Unable to LogIn !Please Check the Credentials") }
    });
  }

  get emailId() { return this.userLoginForm.get("emailId") }
  get password() { return this.userLoginForm.get("password") }

}
