const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const users = require("../models/users.db.schema");
const patients = require("../models/patients.db.schema");
// import our webtoken package
const jwt = require("jsonwebtoken");
// import middleware for changing password and checks token is valid
const {changePasswordVerification,checkJWTToken} = require("./middleware");


// GET users information.
router.get("/home",checkJWTToken,asyncHandler(async function (req, res) {
  /* Checktoken, then search the users and patients database */
  let allUsers = await users.find({});
  let allPatients = await patients.find({});
  // serch the severs for the object that contains the username
  let objSearchUsers = allUsers.find((o) => o.username === req.username);
  let objSearchPatients = allPatients.find((o) => o.username === req.username);
  // if either serch exists
  if (objSearchUsers !== undefined) {
    res.send(objSearchUsers);
  } 
  else if(objSearchPatients !== undefined){
    res.send(objSearchPatients);
  } // send the object back to the user

  // else send error
  else {
    res.status(500).send({ message: "Error Logging in!" });
  }
}));

let u = 0; // variable to count login attemts for Doctor/Admin

/* Login User Admin or Doctor*/
router.post("/login/user",asyncHandler(async function(req, res){
  
  // check sever has user 
  let allUsers = await users.find({})
  let objSearch = allUsers.find((o) => o.username === req.body.username);
  // if user has failed to login 5 times or more
  if(u>=5){
    // request user resets password
    res.status(404).send({message:"Error! Too many incorrect attempts. Please reset password"});
  }
  // user exists and passwords match
  else if (objSearch !== undefined && req.body.password === objSearch.password) {
    // generate token for the user
    let jwtToken = jwt.sign(
      { 
        name:objSearch.name,
        username: objSearch.username,
        password: objSearch.password,
        position:objSearch.position
      },
      "secretKey"
    );
    // send code 200 and send jwtToken
    res.status(200).send({"loggedIn":objSearch,
      "token":jwtToken});

    u = 0;// reset failed login counter
    
    // if username doesn't exist
  } else if (objSearch === undefined) {
    res.status(404).send({ message: "Error! no accout exists with this username" });
    // user exits but password is incorrect
  } else if (objSearch!== undefined && req.body.password!==objSearch.password){
    u++;// add 1 to failed login conter
    // log error
    res.status(404).send({ message: "Error! Password Incorrect! Please try logging in again",failedLogins:u});
  }
  // else any other failure
  else {
    res.status(403).send({ message: "Error! User not Authenticated" });
  }
}));

// patient failed login counter
let i = 0;

// login patient (uses same logic as above user function)
router.post("/login/patient",asyncHandler(async function(req, res){

  // check server has patient
  let allUsers = await patients.find({})
  
  let objSearch = allUsers.find((o) => o.username === req.body.username);
  if(i>=5){
    res.status(404).send({message:"Error! Too many incorrect attempts. Please reset password"});
  }
  else if (objSearch !== undefined && req.body.password === objSearch.password) {
    // generate token for the user
    let jwtToken = jwt.sign(
      { 
        name:objSearch.name,
        username: objSearch.username,
        password: objSearch.password,
        position:"patient"
      },
      "secretKey"
    );
   
    res.status(200).send({"loggedIn":objSearch,
    "token":jwtToken});
    i = 0;
  } else if (objSearch === undefined) {
    res.status(404).send({ message: "Error! No account exists with this username" });
  } else if (objSearch!== undefined && req.body.password!==objSearch.password){
    i++;
    res.status(404).send({ message: "Error! Password Incorrect! Please try logging in again",failedLogins:i});
  }
  else {
    res.status(403).send({ message: "Error! user not Authenticated" });
  }
}));


// new password user (common for both db's)
router.put("/changePassword",changePasswordVerification,asyncHandler(async function(req,res){
  // if changePasswordVerificaton is successful newPassword will have value
  let newPassword = req.newUserPassword;
  // search user and paitient db's
  let allUsers = await users.find({});  
  let allPatients = await patients.find({}); 
  let userSearch = allUsers.find((o) => o.username === req.body.username);
  let patientSearch = allPatients.find((o) => o.username === req.body.username);
  // if user exists
  if(userSearch!==undefined){
  // change password
  userSearch.password = newPassword;
  // update database
  let data = await users.findByIdAndUpdate(userSearch._id,userSearch,{new:true})
  // on success
  if(res.statusCode === 200){
    res.send(`User Password updated:
    ${data.password}`);
    }else{console.log("Error")};
    u = 0 ;//reset counter
  }
    // else patient exists 
    else if(patientSearch!==undefined){
    // change password
    patientSearch.password = newPassword;
    // update database
    let data = await patients.findByIdAndUpdate(patientSearch._id,patientSearch,{new:true})
    // on success 
    if(res.statusCode === 200){
    res.send({message:`Patient Password updated -
    ${data.password}`});
    }else{console.log("Error")};
    i = 0 ;// reset counter
    }
    // else log error
    else{res.status(404).send({message:"Error! username not found!"})}
}));
// export the router
module.exports = router;