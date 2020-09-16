import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { TruemarketService } from '../truemarket.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppGlobals } from '../app.config';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error_message = '';

  constructor(private service: TruemarketService,
              private route: Router,
              private __appGlobal: AppGlobals) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
    if (this.__appGlobal.isLoggedIn.value && this.__appGlobal.token.value.length > 0) {
      this.route.navigate(['product']);
    }
  }



  login(): void {
    if (this.loginForm.valid) {
      this.service.doLogin(this.loginForm.value).subscribe(result => {
        if (result.status) {
          this.__appGlobal.token.next(result.token);
          this.__appGlobal.isLoggedIn.next(true);
          console.log(this.__appGlobal.isLoggedIn.value);
          console.log(this.__appGlobal.token.value);
          localStorage.setItem('Authorization', result.token);
          this.route.navigate(['product']);
        } else {
          this.error_message = result.error;
        }
      }, error => {
        console.log(error);
      });
    }
  }
}
