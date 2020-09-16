import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig, AppGlobals } from './app.config';


@Injectable()
export class TruemarketService {

  constructor(private http: Http,
    private config: AppConfig,
    private __appGlobal: AppGlobals) {
        this.__appGlobal.token.next(localStorage.getItem('Authorization'));
    }

    private Header = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json, text/plain'
    });

    getHeader() {
        return new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Token ' + this.__appGlobal.token.value,
            'Accept': 'application/json, text/plain'
        });
    }

    doLogin(data) {
        const options = new RequestOptions({ headers: this.Header });
        return this.http.post(this.config.login, data, options).pipe(map((response: Response) => {
            return response.json();
        }));
    }

    doRegister(data) {
        const options = new RequestOptions({ headers: this.Header });
        return this.http.post(this.config.register, data, options).pipe(map((response: Response) => {
            return response.json();
        }));
    }

    addProduct(data) {
        const options = new RequestOptions({ headers: this.getHeader() });
        return this.http.post(this.config.product, data, options).pipe(map((response: Response) => {
            return response.json();
        }));
    }

    getProduct() {
        const options = new RequestOptions({ headers: this.getHeader() });
        return this.http.get(this.config.product, options).pipe(map((response: Response) => {
            return response.json();
        }));
    }

    editProduct(id, data) {
        const options = new RequestOptions({ headers: this.getHeader() });
        const url = this.config.product + id + '/';
        return this.http.put(url, data, options).pipe(map((response: Response) => {
            return response.json();
        }));
    }

    deleteProduct(id) {
        const options = new RequestOptions({ headers: this.getHeader() });
        const url = this.config.product + id + '/';
        return this.http.delete(url, options).pipe(map((response: Response) => {
            return response.json();
        }));
    }

    productSearch(name) {
        const options = new RequestOptions({ headers: this.getHeader() });
        return this.http.get(this.config.product_search + name + '/', options).pipe(map((response: Response) => {
            return response.json();
        }));
    }

    postBill(data) {
        const options = new RequestOptions({ headers: this.getHeader() });
        return this.http.post(this.config.order, data, options).pipe(map((response: Response) => {
            return response.json();
        }));
    }

    getBill(id) {
        const options = new RequestOptions({ headers: this.getHeader() });
        return this.http.get(this.config.order + '?billNo=' + id, options).pipe(map((response: Response) => {
            return response.json();
        }));
    }

    getUsers() {
        const options = new RequestOptions({ headers: this.getHeader() });
        return this.http.get(this.config.users, options).pipe(map((response: Response) => {
            return response.json();
        }));
    }

    addStoreUser(data) {
        const options = new RequestOptions({ headers: this.getHeader() });
        return this.http.post(this.config.add_user, data, options).pipe(map((response: Response) => {
            return response.json();
        }));
    }
}
