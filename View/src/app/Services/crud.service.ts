import { Injectable ,OnInit } from '@angular/core';
import {Http, RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class CrudService  {
//token for this user session
 token:string;
  constructor( private http:Http) { 
     //get user token
     this.token= localStorage.getItem('user_token');
    
  }
  ngOnInit(){
  }


  //CRUD Operations 
  //#Add New User
  AddUser(data){
      //set json and authorization headers 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${this.token}`);
      let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:8080/public/api/v1/AddUser',data,options)
      .map(result=>result.json());
  
    
  }


  //#Get the Data from Server 
  GetData(id){
   
    
   //set authorization header 
   let headers = new Headers();
   headers.append('Authorization', `Bearer ${this.token}`);
   console.log(`Bearer ${this.token}`);
   let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:8080/public//api/v1/GetUser/'+id,options)
    .map(result=>result.json());


  }

  //# Edit User
  EditUser(data){
    //set json and authorization headers 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.token}`);
    let options = new RequestOptions({ headers: headers });
    return this.http.put('http://localhost:8080/public/api/v1/UpdateUser',data,options)
    .map(result=>result.json());

  }

  //#Delete User
  DeleteUser(user_id){
    //set authorization header 
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    let options = new RequestOptions({ headers: headers });
    return this.http.delete('http://localhost:8080/public//api/v1/DeleteUser/'+user_id,options)
    .map(result=>result.json());

  }




}
