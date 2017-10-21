import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import{AuthgrudService} from './Services/authgrud.service';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  {path: 'Login',component: LoginComponent},
  {path: 'Home',component: HomeComponent,canActivate:[AuthgrudService]},
  
]