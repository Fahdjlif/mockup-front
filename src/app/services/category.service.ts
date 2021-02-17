import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Category } from '../models/category';

const headers = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl = 'http://localhost:8082/category';
  constructor(private httpClient: HttpClient, private tokenService:TokenService ) { }

  public getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoryUrl +'/all',headers);
  }
  public addCategory(category:Category): Observable<Category> {
    return this.httpClient.post<Category>(this.categoryUrl ,JSON.stringify(category), headers);
  }
  deleteCategory(id: number) {
    return this.httpClient.delete(this.categoryUrl+'/'+id.toString() , headers);
  }
  updateCategory(category:Category)
  {
    return this.httpClient.put<Category>(this.categoryUrl+'/'+category.id.toString() ,JSON.stringify(category), headers);
  }
  
}
