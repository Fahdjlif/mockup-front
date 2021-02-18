import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { TokenService } from './token.service';

const headers = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productURL = 'http://localhost:8080/mockup-0.0.1-SNAPSHOT/product';
  constructor(private httpClient: HttpClient, private tokenService:TokenService ) { }

  public getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productURL +'/all',headers);
  }
  public addProduct(product:Product): Observable<Product> {
    return this.httpClient.post<Product>(this.productURL ,JSON.stringify(product), headers);
  }
  deleteProduct(id: number) {
    return this.httpClient.delete(this.productURL+'/'+id.toString() , headers);
  }
  updateProduct(product:Product)
  {
    return this.httpClient.put<Product>(this.productURL+'/'+product.id.toString() ,JSON.stringify(product), headers);
  }
  
}
