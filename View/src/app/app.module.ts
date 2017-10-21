import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
//http module to call apis
import {HttpModule} from '@angular/http';
//import root router
import {rootRouterConfig} from './app.routes';
//router module 
import { RouterModule } from '@angular/router';
//Form module 
import {FormsModule} from '@angular/forms';
//import services 
import{AuthgrudService} from './Services/authgrud.service';
import{CrudService} from './Services/crud.service';
import{LoginService} from './Services/login.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(rootRouterConfig)
  ],
  providers: [LoginService,CrudService,AuthgrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
