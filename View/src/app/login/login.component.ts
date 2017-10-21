import { Component, OnInit } from '@angular/core';
//import router or nvigation 
import {Router} from '@angular/router';
//import login service 
import{LoginService} from '../Services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // user login parms
  username:string;
  password:string;
  //error condation
  error:boolean;

  constructor(private LoginSer:LoginService, private router:Router) { }

  ngOnInit() {
  }
  //Login 
  LoginMe(){
    //reset error condation 
    this.error=false;
    //create post data 
    let data = new FormData();
    data.append('userName',this.username);
    data.append('password',this.password);
    console.log(this.password);
    console.log(this.username);

    this.LoginSer.login(data).subscribe(
      result=>{
        console.log(result);
        //save user in the local storage 
        localStorage.setItem('user',JSON.stringify(result.user));
        //save user token in local storage
        localStorage.setItem('user_token',result.token);
        console.log(localStorage.getItem('user_token'));
        //navigate to home page
        this.router.navigate(['/Home']);
      },
      error=>{
        console.log(error);
        //set error condation to true
        this.error=true;
      }
    
    )


  }

 

}
