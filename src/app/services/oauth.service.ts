import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenDto } from '../models/token-dto';
import { Observable } from 'rxjs';

const response = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  oauthURL = 'http://localhost:8082/oauth/';

  constructor(private httpClient: HttpClient) { 
  
  }

  public google(tokenDto: TokenDto): Observable<TokenDto> {
    console.log(tokenDto.value);
    return this.httpClient.post<TokenDto>(this.oauthURL + 'google', tokenDto, response);
  }

  public facebook(tokenDto: TokenDto): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(this.oauthURL + 'facebook', tokenDto, response);
  }

}
