import { Component, OnInit } from '@angular/core';

import { TruemarketService } from '../truemarket.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  registerForm: FormGroup;
  message: string;

  constructor(private service: TruemarketService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      code: new FormControl('', [
        Validators.required
      ]),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      address: new FormControl('', [
        Validators.required
      ]),
      website: new FormControl()
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.service.doRegister(this.registerForm.value).subscribe(result => {
        if (result) {
          this.message = 'Registered Succesfully';
        }
      }, error => {
        console.log(error);
      });
    }
  }

}
