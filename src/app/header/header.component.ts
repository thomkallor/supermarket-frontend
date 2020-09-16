import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private __appGlobal: AppGlobals,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.__appGlobal.token.next(null);
    this.__appGlobal.isLoggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
