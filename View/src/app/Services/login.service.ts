import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class LoginService {

  constructor( private http:Http) { }
  //lgoin method 
  login(data){
    return this.http.post('http://localhost:8080/public//api/v1/Login',data)
    .map(result=>result.json())
  }

}
