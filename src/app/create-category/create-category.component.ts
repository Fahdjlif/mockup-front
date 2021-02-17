import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  category: Category = new Category();
  dateFormCtrl:FormControl = new FormControl(new Date());
  constructor(public dialogRef: MatDialogRef<CreateCategoryComponent>, private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {

  }


  save() {
    this.category.creation= this.dateFormCtrl.value;
    this.categoryService
      .addCategory(this.category).subscribe(data => {
        console.log(data)
        this.category = new Category();
      },
        error => console.log(error));
        this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  

  gotoList() {
    this.router.navigate(['/products']);
  }

}
