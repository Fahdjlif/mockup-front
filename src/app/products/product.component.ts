import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  columns = ['name', 'description', 'actions'];
  products: Product[] = [];
  product: Product = new Product();
  dataSource: MatTableDataSource<Product>;
  splicedData: Product[];
  categories: Category[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;

  constructor(private productService: ProductService, private categoryService: CategoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.extractProducts();
    this.getCategories();


  }

  private extractProducts() {
    this.productService.getAll().subscribe(
      data => {
        this.products = data;

        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        const offset = ((this.paginator.pageIndex + 1) - 1) * this.paginator.pageSize;
        this.splicedData = this.products.slice(offset).slice(0, this.paginator.pageSize);
      },
      err => {
        console.log(err);
      }
    );
  }

  private getCategories() {
    this.categoryService.getAll().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      data => {

      },
      err => {
        console.log(err);
      }
    );
    let index = this.products.findIndex(product => product.id === id);
    this.products.splice(index, 1);
  }
  
  pageChangeEvent(event) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.splicedData = this.products.slice(offset).slice(0, event.pageSize);
  }

  createProduct() {
    let dialogRef = this.dialog.open(CreateProductComponent, {
      width: '300px'}
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  createCategory() {
    let dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '300px'}
    );
    dialogRef.afterClosed().subscribe(result => {
      this.getCategories();
    });


  }

  openDialog(product: Product) {
    this.product = product;
    let dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '250px',
      data: { product: this.product }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      product = result;
    
    });
  }

  onChange(value) {
    console.log('products', this.products);
    if(value!=null )
    {
      let newProducts:Product[]=[];
      for(var product of this.products)
      {
        if(product.category!=null)
        {
          if(product.category.id==value){
          newProducts.push(product);

          }
        }
      }
      this.splicedData= newProducts;
      this.dataSource.data=this.splicedData;
      // this.dataSource = new MatTableDataSource(newProducts);
      // const offset = ((this.paginator.pageIndex + 1) - 1) * this.paginator.pageSize;
      // this.splicedData = newProducts.slice(offset).slice(0, this.paginator.pageSize);
    }
    else{
      this.extractProducts();
    }
    
}
}
