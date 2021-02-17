import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core/public-api';
import {  FormGroupDirective, NgForm, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  product: Product;


  constructor(public dialogRef: MatDialogRef<UpdateProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService) {
    console.log(this.data.product);
    this.product = this.data.product;
  }

  ngOnInit() {
  }

  update() {

    this.productService.updateProduct(this.product).subscribe(data => {
      console.log(data)
    },
      error => console.log(error));
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
