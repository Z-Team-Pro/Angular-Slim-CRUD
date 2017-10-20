<?php
// Application middleware

//Adding CORS headers to the response 
$app->add(function ($req, $res, $next) {
            $response = $next($req, $res);
        return $response
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    });
//Adding JWT validation for all routes
$app->add(new \Slim\Middleware\JwtAuthentication([
        "path" => ["/"],
       "passthrough" => ["/api/v1/Login"],
       "secret" => "supersecretkey",
       "error" => function ($request, $response, $arguments) {
           $data["status"] = "error";
           $data["message"] = $arguments["message"];
           return $response
               ->withHeader("Content-Type", "application/json")
               ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
       }
   ]));



