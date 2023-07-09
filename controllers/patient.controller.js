// import patient schema
const patient = require("../models/patients.db.schema")
// import async handler to process async functions 
const asyncHandler = require("express-async-handler");

// create new patient 
exports.createNewPatient = asyncHandler(async function(req,res){
    let input = req.body;// new patient 
    // search db for item
    let allPatients = await patient.find({});
    let objSearchPatients = allPatients.find((o) => (o.username === input.username && o.contactNumber === input.contactNumber));
    // if patient exists
    if(objSearchPatients!==undefined){
      // log error 
      res.send({message:"Error, Patient already exists."})
    }else{// if patient doesn't exist
    // insert new patient and log success
    let data = await patient.insertMany(input)
    if(res.statusCode === 200){
        res.send({message:`New Patient Added - ${data}`})
    }else{console.log("Error");}
  }
})

// find patient record
exports.findPatientRecord = asyncHandler(async function(req,res){
    let filter = {[req.body.query]:req.body.filter};
    // search database with filter
    let data = await patient.find(filter);
    if(res.statusCode === 200){// on success 
        res.send(data);// send data
        }else{console.log("Error")};
})

// patient records for admins who don't get to see confidential appointment info
exports.findPatientRecordAdmin = asyncHandler(async function(req,res){
    let filter = {[req.body.query]:req.body.filter};
    // query database with filter and ommit private fields
    let data = await patient.find(filter, {previousAppointments:{appointmentNotes:0,
            followUpNotes:0}});
    if(res.statusCode === 200){// on success 
        res.send(data);// send data 
        }else{console.log("Error")};
})



// update a patient record
exports.updatePatientRecord = asyncHandler(async function(req,res){
    let id = req.params.id ;// item to update 
    let toUpdate = req.body; // content to update
    // update database, on success send response
    let data = await patient.findByIdAndUpdate(id,toUpdate,{new:true})
    if(res.statusCode === 200){
        res.send({message:`Patient Updated -${data.name}`});
        }else{console.log("Error")};
});


// delete an account
exports.deletePatientRecord = asyncHandler( async function(req,res){
    let id = {"_id":req.params.id}; // item to delete 
    // remove item from database, on success send message
    let data = await patient.findOneAndRemove(id);
    if(res.statusCode === 200){
        res.send(`Patient Removed - ${data}`);
        }else{console.log("Error")};
})
