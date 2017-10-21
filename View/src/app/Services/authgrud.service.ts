import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
//import { AuthConfig ,JwtHelper  } from 'angular2-jwt/angular2-jwt';
@Injectable()
export class AuthgrudService {

  constructor(private router: Router) { }

      //implement can Activate router method  
     canActivate() {
        
         if (localStorage.getItem('user_token')) {
             
            return true
         }
  
         // not logged in so redirect to login page
         this.router.navigate(['/Login']);
         return false;
     }
 }


