<?php
//Login route to access CRUD operations and get JWT token

$app->post('/api/v1/Login',function($req,$res){
    //get login data from user request 
    $data=$req->getParsedBody();
    //check for empty data
    if(!isset($data['userName'],$data['password'])){
        $message=array('status'=>false,'message'=>'some data are empty');
        return $res->withJson($message,400);
    } 
    try{
        //login user 
        $query= new $this->ParseQuery('An_Users');
        $query->equalTo('name',$data['userName']);
        $query->equalTo('password',$data['password']);
        $user=$query->find();

        if($user){
            //log user login in server log 
            $this->logger->info('new user login with user name= '.$data['userName']);
            //Create user array
            $user_array=array('userName'=> $user[0]->get('name'),
                        'email'=>$user[0]->get('email'),
                        'phone'=>$user[0]->get('phone'),
                        'user_id'=>$user[0]->getObjectId() ); 
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
            //send Response to user 
            $message=array('status'=>true,"user_data"=>$user_array,'token'=>$token);
            return $res->withJson($message,200);
        }
        else {
            //wrong name or password 
            $message=array('status'=>false,"message"=>'Wrong User name or password ');
            return $res->withJson($message,400);

        } 
        }
    catch(Exception $ex) {
        //Loging error in server log
        $this->logger>info("Error in Login  users " .$ex);
        $message=array("status"=>false,"message"=>"Error in login user ","error"=>$ex->getMessage());
        //return the response to client 
        return $res->withJson($message,500);
    }
});
