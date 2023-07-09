// middleware functions to check tokens/content/and allow password change

// import web token package
let jwt = require("jsonwebtoken");


// check token funcions
function checkJWTToken(req,res,next){
    if(req.headers.token){// if token exists
        let token = req.headers.token;
        // use verify to decode token 
        jwt.verify(token,"secretKey",function(error,data){
            if(error){
                res.send({message:"Invalid Token"});
                next();
            }else{
                // if token is valid 
                // set username,password && position to req.username/password/position
                // so they can be used in the index/user functions
                req.username = data.username;
                req.password = data.password;
                req.position = data.position;
                next();
            }
        });
    }else{// no token in headers so send error
        res.send({message:"No token attached to the request"});
    }
};
// check content is application/json
function checkContent(req,res,next){
    let content = req.headers["content-type"];
    let body = req.body;
    if(content!=="application/json"){// if content is not json
        //send error
        res.status(400).send({message:"Item content is not of application/json, request rejected"});
        // change request body to empty string so the post/put functions will not update
        body = {};
        next();
    }
    else{next();}
}
// change password if user cannot login
function changePasswordVerification(req,res,next){
    // if new password is the same as the confirm password and is greater than 6 characters 
    if(req.body.newPassword === req.body.confirmPassword && req.body.newPassword.length >= 6){
        req.newUserPassword = req.body.newPassword;// change password
        next();
        // if new password is shorter than 6 characters 
    }else if(req.body.newPassword.length < 6){
        res.send({message:"The new password must be longer than 6 characters"});
        next();
    }else{// new passwords dont match 
        res.send({message:"Confirmation Password and New Password do not match."});
        next();
    }
}

// export the middleware functions 
module.exports = {
    changePasswordVerification,
    checkJWTToken,
    checkContent
};