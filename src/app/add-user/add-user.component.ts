import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TruemarketService } from '../truemarket.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  storeUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private service: TruemarketService
  ) { }

  ngOnInit() {
    this.storeUserForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      mobile_number: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  addUser() {
    if (this.storeUserForm.valid) {
      this.service.addStoreUser(this.storeUserForm.value).subscribe(result => {
        if (result) {
          console.log(true);
          this.dialogRef.close();
        }
      });
    }
  }

}
