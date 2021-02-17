import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product = new Product();
  categories: Category[] = [];

  constructor(public dialogRef: MatDialogRef<CreateProductComponent>,private productService: ProductService, private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      },
      err => {
        console.log(err);
      }
    );
  }


  save() {
    console.log(this.product);
    this.productService
      .addProduct(this.product).subscribe(data => {
        console.log(data)
      },
        error => console.log(error));
        this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onChange(value) {
    console.log(value);
    this.product.category= value;
    
}

}