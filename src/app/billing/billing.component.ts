import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TruemarketService } from '../truemarket.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { element } from '@angular/core/src/render3';

class Product {
  product: string;
  name: string;
  quantity: number;
  rate: number;
  tax: string;
  central_gst_tax: number;
  state_gst_tax: number;
  amount: number;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  displayedColumns: string[] = ['name', 'quantity', 'tax', 'rate', 'amount', 'action'];
  dataSource: MatTableDataSource<Product[]>;

  formProductSearch = new FormControl();
  formQuantity = new FormControl();

  options: Product[];

  cart: Product[] = [];

  cart_quantity = 0.0;
  total_rate = 0.0;
  state_gst_tax = 0.0;
  central_gst_tax = 0.0;

  final_amount = 0.0;

  mobile_number: string;
  payment_mode: string;
  discount = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: TruemarketService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formProductSearch.valueChanges.subscribe(() => {
      this.getList(this.formProductSearch.value);
    });
    this.dataSource = new MatTableDataSource();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getBill(id);
    }
  }

  getBill(id): void {
    this.service.getBill(id).subscribe(result => {
      this.dataSource.data = result['order_items'];
      this.mobile_number = result['mobile_number'];
      this.payment_mode = result['payment_mode'];
      this.calculate();
    }, error => {
      console.log(error);
    });
  }

  calculateDiscount(): void {
    if (this.dataSource.data.length > 0 && this.total_rate > 0 &&  this.discount > 0) {
      this.final_amount = this.total_rate - (this.total_rate * this.discount) / 100;
    } else {
      this.final_amount = this.total_rate;
    }
  }

  getList(name): void {
    if (name != null && name.length > 0) {
      this.service.productSearch(name).subscribe(result => {
        this.options = result;
      }, error => {
        this.options = [];
      });
    } else {
      this.options = [];
    }
  }

  toShow() {
    return (val) => this.display(val);
  }

  private display(val): string {
    return val ? val.name : val;
 }

  updateTable(product) {
    const data = this.dataSource.data;
    data.push(product);
    this.dataSource = new MatTableDataSource<Product[]>(data);
    this.calculate();
  }

  update(index) {
    const data = this.dataSource.data[index];
    data['amount'] = data['quantity'] * data['rate'];
    this.dataSource.data[index] = data;
    this.dataSource = new MatTableDataSource<Product[]>(this.dataSource.data);
    this.calculate();
    console.log(data, this.dataSource.data);
  }

  delete(index): void {
    this.cart.splice(index, 1);
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource<Product[]>(this.dataSource.data);
    this.calculate();
    console.log(this.cart);
    console.log(this.dataSource.data);
  }

  add(): void {
    let checkStatus = true;
    this.dataSource.data.forEach(result => {
      if (result['product'] === this.formProductSearch.value.id) {
        result['quantity'] = result['quantity'] + this.formQuantity.value;
        result['amount'] = result['rate'] * result['quantity'];
        this.calculate();
        checkStatus = false;
        return;
      }
    });
    if (checkStatus) {
      const pro = new Product();
      pro.product = this.formProductSearch.value.id;
      pro.name = this.formProductSearch.value.name;
      pro.quantity = this.formQuantity.value;
      pro.rate = this.formProductSearch.value.selling;
      pro.tax = 'CGST:' + this.formProductSearch.value.central_gst_tax + ' SGST:' + this.formProductSearch.value.state_gst_tax;
      pro.state_gst_tax = this.formProductSearch.value.state_gst_tax;
      pro.central_gst_tax = this.formProductSearch.value.central_gst_tax;
      pro.amount = pro.rate * pro.quantity;
      this.cart.push(this.formProductSearch.value);
      this.updateTable(pro);
    }
    this.formProductSearch.reset();
    this.formQuantity.reset();
  }

  calculate(): void {
    let cart_quantity = 0;
    let total_rate = 0;
    let state_gst_tax = 0;
    let central_gst_tax = 0;

    this.dataSource.data.forEach(e => {
      cart_quantity += e['quantity'];
      total_rate += e['rate'] * e['quantity'];
      state_gst_tax += (e['rate'] / 100) * e['state_gst_tax'];
      central_gst_tax += (e['rate'] / 100) * e['central_gst_tax'];
    });

    this.cart_quantity = cart_quantity;
    this.total_rate = total_rate;
    this.final_amount = total_rate;
    this.state_gst_tax = state_gst_tax;
    this.central_gst_tax = central_gst_tax;
  }

  print(): void {
    const billing = {
      'mobile_number': this.mobile_number,
      'payment_mode': this.payment_mode,
      'order_items' : this.dataSource.data
    };
    this.service.postBill(billing).subscribe(result => {
      this.mobile_number = null;
      this.payment_mode = null;
      this.dataSource = null;
      this.calculate();
      this.router.navigateByUrl('billing');
    }, error => {
      console.log(error);
    });
  }
}
