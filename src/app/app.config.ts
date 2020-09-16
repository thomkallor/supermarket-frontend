import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export class AppConfig {
    public readonly domain = environment.host;
    public readonly store = this.domain + 'store/';
    public readonly login = this.store  + 'login/';
    public readonly register = this.store  + 'register_admin/';
    public readonly product = this.store  + 'product/';
    public readonly product_search  = this.store + 'product_search/';
    public readonly order = this.store  + 'order/' ;
    public readonly users = this.store  + 'users/' ;
    public readonly add_user = this.store  + 'add_user/' ;

}

@Injectable()
export class AppGlobals {
  // use this property for property binding
  public userType: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public isLoggedIn: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public token: BehaviorSubject<string> = new BehaviorSubject<string>('');
}
