import { Component, OnInit } from '@angular/core';
import { AppGlobals } from './app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private __appGlobal: AppGlobals,
    private router: Router,
  ) { }

  ngOnInit () {
    this.__appGlobal.token.next(localStorage.getItem('Authorization'));
    console.log(this.__appGlobal.isLoggedIn.value);
    console.log(this.__appGlobal.token.value);
    if (this.__appGlobal.token.value) {
      this.router.navigateByUrl('/billing');
    }
  }
}
