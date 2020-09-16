import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort,
    MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TruemarketService } from '../truemarket.service';


export interface DialogData {
  name: string;
  alias_name: string;
  price: number;
  selling: number;
  mrp: number;
  state_gst_tax: number;
  central_gst_tax: number;
  stock: number;
  id: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'alias_name',
    'price', 'selling', 'mrp', 'state_gst_tax', 'central_gst_tax', 'stock', 'id'];
  dataSource: MatTableDataSource<DialogData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    public service: TruemarketService) {
      this.getProduct();
    }

  deleteProduct(id) {
    this.service.deleteProduct(id).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
    });
  }

  getProduct(): void {
    this.service.getProduct().subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '80vw',
      height: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProduct();
    });
  }

  editProduct(data) {
    console.log(data);
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '80vw',
      height: '80vh',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProduct();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: 'add-product.component.html',
})
export class AddProductDialogComponent implements OnInit {
  addProductForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public service: TruemarketService,
    private router: Router) {
    }

  ngOnInit() {
    this.addProductForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      alias_name: new FormControl('', [
        Validators.required
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      selling: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      state_gst_tax: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      central_gst_tax: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      mrp: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      stock: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      category: new FormControl('', [
        Validators.required
      ])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addProduct(): void {
    this.service.addProduct(this.addProductForm.value).subscribe(result => {
      this.dialogRef.close();
      this.router.navigate(['product']);
    }, error => {
      console.log(error);
    });
  }
}

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: 'add-product.component.html',
})
export class EditProductDialogComponent implements OnInit {
  addProductForm: FormGroup;
  product_id: number;
  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public service: TruemarketService,
    private router: Router) {
    }

  ngOnInit() {
    this.addProductForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      alias_name: new FormControl('', [
        Validators.required
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      selling: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      state_gst_tax: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      central_gst_tax: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      mrp: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      stock: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')
      ]),
      category: new FormControl('', [
        Validators.required,
      ])
    });
    this.product_id = this.data.id;
    this.addProductForm.patchValue(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addProduct(): void {
    this.service.editProduct(this.product_id,
      this.addProductForm.value).subscribe(result => {
        this.dialogRef.close();
        this.router.navigate(['product']);
    }, error => {
      console.log(error);
    });
  }
}
