<?php 
//CRUD opeerations 

//Add new user 
$app->post('/api/v1/AddUser',function($req,$res){

   //get the data from the Request 
   $data= $req->getParsedBody();

   //Create a new user
  try{
    $new= new $this->ParseObject("An_Users");
    $new->set("name",$data['userName']);
    $new->set("password", md5($data['password']));
    $new->set("email",$data['email']);
    $new->set("phone",$data['phone']);
    $new->save();
    //logging this action in the server log
    $this->logger->info("user has been saved successflly " );
    $messag=array("status"=>true,"message"=>"user has been Created","userId"=>$new->getObjectId());
    //Generate a new JWT token for this user 
    $MyJWT=$this->JWT;
    $now = new DateTime();
    $future = new DateTime("now +10 minutes");
    // $server = $request->getServerParams();
    $payload = [
        "iat" => $now->getTimeStamp(),
        "exp" => $future->getTimeStamp(),
        "sub" =>"JWT Demo",
    ];
    $secret = "supersecretkey";
    $token = $MyJWT->encode($payload, $secret, "HS512");
    $messag["token"] = $token;
    return $res->withStatus(201)
        ->withHeader("Content-Type", "application/json")
        ->write(json_encode($messag, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
         return $res->withJson($messag,200,JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT); 
    }
    catch ( Exception $ex){
           $this->logger>info("Error in saving new user " .$ex);
           $messag=array("status"=>false,"message"=>"Error in Creating user ","error"=>$ex->getMessage());
           //return the response to client 
           return $res->withJson($messag,500); 
    }
    
});

//Get Users Data 

$app->get('/api/v1/GetUser[/{id}]',function($req,$res,$args){
    //get user data
    
   try {
        $query=new $this->ParseQuery("An_Users");

        //check for given Id
    
       if(isset($args['id'])){
           
         //get user from DB
         $user= $query->get($args['id']);
         $user_array= array('userName'=>$user->get('name'),
                         'email'=>$user->get('email'), 
                         'phone'=>$user->get('phone'));
          //send response 
          $message=array('status'=>true,'user'=>$user_array);
          return $res->withJson($message,200);
                         
         }
         else{
             //list of users
           $users_list=array(); 
           $users=$query->find();
           foreach($users as $key=> $user){
            $user_array= array('userName'=>$user->get('name'),
                               'email'=>$user->get('email'), 
                               'phone'=>$user->get('phone'));
            //push user array on users_list
            array_push($users_list,$user_array); 
           }
           //send response 
           $message=array('status'=>true,'users_list'=>$users_list);
           return $res->withJson($message,200);
            


           }



         }
    
    catch ( Exception $ex){
        //Loging error in server log
        $this->logger>info("Error in retriving  users " .$ex);
        $message=array("status"=>false,"message"=>"Error in retriving users ","error"=>$ex->getMessage());
        //return the response to client 
        return $res->withJson($message,500); 

    }

    
    
    
    
    //check for id 





});
    
//Update User Data 
$app->put('/api/v1/UpdateUser',function($req,$res){
    //get the data from request body 
    $data= $req->getParsedBody();
    echo json_decode($data);
    try {
        //check for empty user id 
        if(!isset($data['user_id'])){
            $message=array('status'=>false,'message'=>'empty user id');
            return $res->withJson($message,400);

        }
        //update user data with request params 
        $query= new $this->ParseQuery('An_Users');
        $user_object=$query->get($data['user_id']);
        foreach($data['data'] as $key=>$value){
            $user_object->set($key,$value);
        }
        $user_object->save();
        //log updating user in server log 
        $this->logger->info("update user data for User_Id= ".$data['user_id']);
        //return success respose
        $message=array('status'=>true,'message'=>'User data has been updated');
        return $res->withJson($message,200);
        
    }
    catch ( Exception $ex){
        $this->logger->info("Error in updating  user " .$ex);
        $message=array("status"=>false,"message"=>"Error in updating user ","error"=>$ex->getMessage());
        //return the response to client 
        return $res->withJson($message,500); 
 }
    
});

//Delete User Data 
$app->delete('/api/v1/DeleteUser/{user_id}',function($req,$res,$args){
    //get user id from request parms
    try{

     $user_id=$args['user_id'];
     //delete the user 
     $query= new $this->ParseQuery('An_Users');
     $user=$query->get($user_id);
     $user->destroy();
     //loging deleting user 
     $this->logger->info('Delete user  with used_id='.$user_id);
     //send respose to user with success 
     $message=array('status'=>true,"message"=>"User has been deleted");
     return $res->withJson($message,200);

    }
    catch (Exception $ex) {
        //log delete error
        $this->logger->info("Error in deleting  user " .$ex);
        $message=array("status"=>false,"message"=>"Error in deleting user ","error"=>$ex->getMessage());
        //return the response to client 
        return $res->withJson($message,500);

    }



});





