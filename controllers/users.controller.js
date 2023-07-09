// import the user schema
const user = require('../models/users.db.schema');
// asyncHandler is used to write the async funtions
const asyncHandler = require("express-async-handler");

//add new user
exports.create = asyncHandler(async function(req,res){    
    let input = (req.body);// item to add
    // check user does not already exist
    let allUsers = await user.find({});
    let objSearchUsers = allUsers.find((o) => (o.username === input.username && o.name === input.name))
    if(objSearchUsers===undefined){
    // if user doesn't exist add user and log success
    let data = await user.insertMany(input);
    if(res.statusCode === 200){
        res.send({message:`New User Added - ${data}`});
        }else{console.log("Error")};
    // else error
    }else{res.send({message:"Error, user already exists."})}    
});

// find users 
exports.findUser = asyncHandler(async function(req,res){
    // filter to query database
    let filter = {[req.body.query]:req.body.filter};
    // find user
    let data = await user.find(filter);
    if(res.statusCode === 200){
    // on success send data
    res.send(data);
    }else{console.log("Error")};
});



//Update a single user account
exports.updateUser = asyncHandler(async function(req,res){
    
    let id = req.params.id ; // id of account to update 
    let toUpdate = req.body; // updated content
    // find user and update database
    let data = await user.findByIdAndUpdate(id,toUpdate,{new:true})
    // on success 
    if(res.statusCode === 200){
        res.send({message:`User Updated - ${data}`});
        // else
        }else{console.log("Error")};
});


// delete an user account
exports.deleteById = asyncHandler( async function(req,res){
    let id = {"_id":req.params.id}// id of account to delete
    // find and remove
    let data = await user.findOneAndRemove(id);
    // on success
    if(res.statusCode === 200){
        res.send(`User Removed - ${data}`);
        // else
        }else{console.log("Error")};
})


