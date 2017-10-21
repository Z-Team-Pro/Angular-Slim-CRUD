import { Component, OnInit } from '@angular/core';
//CRUD service
import{CrudService} from '../Services/crud.service';
//import router or nvigation 
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
//Users list 
Users:Array<any>;
// add user parms
name:string;
phone:string;
email:string;
//edit user parms
new_name:string;
new_phone:string;
new_email:string;
 
  constructor( private CRUD:CrudService ,private route:Router) { 
   


  }

  ngOnInit() {
    //load All users after page init
    this.GetAll();
    //get user data    
   
  }
  //get all users
  GetAll(){
    this.CRUD.GetData("").subscribe(
      result=>{
        console.log(result);
        //load users 
        this.Users=result.users_list;
      },
      error=>{
        console.log(error);
      }
    )


  }
  //AddUser
  AddUser(){
  //create user  json
   let data= {userName:this.name,email:this.email ,phone:this.phone};
    this.CRUD.AddUser(data).subscribe(
      result=>{
        console.log(result);
        //create empty user opject
        let user=Array();
        user['userName']="Not Fetched Data";
        user['email']="Not Fetched Data";
        user['phone']="Not Fetched Data";
        user['user_id']=result.userId;
        //set new proparty to user object
        user['new']=true;
        //push new user in the array list 
        this.Users.push(user);
        this.name="";
        this.email="";
        this.phone="";

      },
      error=>{
        console.log(error);
        this.Users=null;
      }
    )
  }
  //Delete User 
  DeleteUser(id){
    this.CRUD.DeleteUser(id).subscribe(
      result=>{
        console.log(result);
        //remove this user from users list 
        this.Users=this.Users.filter(function(element){
         return element.user_id!=id;

        });

      },
      error=>{
        console.log(error);
        this.Users=null;
       }
    )
  }
  //Get user with id 
  GetUser(id){

    this.CRUD.GetData(id).subscribe(
      result=>{
        console.log(result);
        //get  user data with the new from server 
         let user =  this.Users.find(x => x.user_id == id);
         let index=this.Users.indexOf(user);
         console.log(user);
         console.log(index);
         user['userName']=result.user.userName;
         user['email']=result.user.email;
         user['phone']=result.user.phone;
         user['new']=false;
         //save it again 
         this.Users[index]=user;
         

        },error=>{
          console.log(error);
          this.Users=null
        });

      }
      
  



  //Edit User 
  EditUser(id){
    //find user 
    let user =  this.Users.find(x => x.user_id == id);
    let index=this.Users.indexOf(user);
    //add user data to parms
    this.new_name=user.userName;
    this.new_email=user.email;
    this.new_phone=user.phone;
    //make this user ediable 
    console.log(user);
    console.log(index);
    user['edit']=true;
    //save it again 
    this.Users[index]=user;



   } 

  //Update user data 
  UpdateUser(id){
      let user =  this.Users.find(x => x.user_id == id);
      let index=this.Users.indexOf(user);
      //add user data to parms
      //this.new_name=user.userName;
      //this.new_email=user.email;
      //his.new_phone=user.phone;
      //create new user json object 
      let data={
          "user_id": id,
          "data": {
                "name": this.new_name,
                "phone": this.new_phone,
                "email":this.new_email
                  }
          }
          //call update API 
          this.CRUD.EditUser(data).subscribe(
            result=>{
              console.log(result);
              user['edit']=false;
              this.Users[index]=user;
              },
              error=>{
                console.log(error);
                this.Users=null;
              }
            
          )


  }
  //Logoutuser 
  Logout(){
    //remove user  token
    localStorage.removeItem('user_token');
    //navigate to login page 
    this.route.navigate(["/Login"]);




  }


}