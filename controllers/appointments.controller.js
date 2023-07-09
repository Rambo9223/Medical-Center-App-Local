// import the appointment & patient schema
const appointment = require("../models/appointments.db.schema");
const patients = require("../models/patients.db.schema")
// async handler to process async functions
const asyncHandler = require("express-async-handler");


// create new appointment, 
exports.createAppointment = asyncHandler(async function(req,res){
    // for testing purposes
    if(req.headers.test==="true"){
        res.status(200).send(req.body);
    }
    
    let input = req.body;//the new appointment object
    let data = await appointment.insertMany(input)// insert to db
    if(res.statusCode === 200){//on success
        //log success
        res.status(200).send({message:`New Appointment Added! `,data:data})
    }else{console.log("Error");}
})

// find appointments as a doctor
exports.findAppointmentDoctor = asyncHandler(async function(req,res){
    // the filter to query the database
    let filter = {[req.body.query]:req.body.filter};
    if (req.body.query === "dateTime"){//if filter is date
        // change dates to ISOStrings and modify filter
        let inputDate1 = new Date(req.body.date_1).toISOString();
        let inputDate2 = new Date(req.body.date_2).toISOString();
        filter = {[req.body.query]:{$gte:inputDate1,$lt:inputDate2}};
    }else if(req.body.query===undefined){//else no filter attached
        //empty object will return all objects from the db
        filter=req.body;
    }
    // find appointment 
    let data = await appointment.find(filter);
    if(res.statusCode === 200){// on success 
        res.send(data);//send data
        }else{console.log("Error")};//else log error
})

// find appointments if patient logged in
/*We will only return the patients appointment so the 
filter is fixed */
exports.findAppointmentPatient = asyncHandler(async function(req,res){
    let filter = {[req.body.query]:req.body.filter};
    let data = await appointment.find(filter);
    if(res.statusCode === 200){
        res.send(data);
        }else{console.log("Error")};
})
/*Find appointments as admin, 
uses same logic as the find appointments as doctor function
although the returned data will ommit the appointment & follow up notes 
as this information is confidential between patients and doctors */
exports.findAppointmentAdmin = asyncHandler(async function(req,res){
    let filter = {[req.body.query]:req.body.filter};
    if (req.body.query === "dateTime"){
        let inputDate1 = new Date(req.body.date_1).toISOString();
        let inputDate2 = new Date(req.body.date_2).toISOString();
        filter = {[req.body.query]:{$gte:inputDate1,$lt:inputDate2}};
    }else if(req.body.query===undefined){
        filter=req.body;
    }
    // by setting the appointment notes and followUpNotes to 0 they are ommited from return
    let data = await appointment.find(filter, {appointmentNotes:0,followUpNotes:0});
    if(res.statusCode === 200){
        res.send(data);
        }else{console.log("Error")};
})


//Update a single appointment
exports.updateAppointment = asyncHandler(async function(req,res){
    let id = req.params.id ;// id of appointment to update 
    let toUpdate = req.body;// the content to update
    // update the item
    let data = await appointment.findByIdAndUpdate(id,toUpdate,{new:true})
    // on success
    if(res.statusCode === 200){
        res.send({message:`Appointment details updated! Appointment ID - ${data._id}`});
        }else{console.log("Error")};
})

// archive appointment to patient account previousAppointments
exports.archiveAppointment = asyncHandler(async function(req,res){
    let id = req.params.id ; // appointment to archive
    let toUpdate = req.body; // content 
    toUpdate.archived = true; // change archived to true
    // update appointment
    let data = await appointment.findByIdAndUpdate(id,toUpdate,{new:true});
    // on update
    if(res.statusCode === 200){
        // search patient database for the patient name in appointment
        let allPatients = await patients.find({})
        let objSearchPatients = allPatients.find((o) => o.name === req.body.patient);
        // if patient exists
        if(objSearchPatients!==undefined){
            // add appointment to patient previousAppointments 
            objSearchPatients.previousAppointments.push(data);
            // update the patients database
            let patientData = await patients.findByIdAndUpdate(objSearchPatients._id,objSearchPatients,{new:true})
            console.log(patientData);
        }else{
            // if patient doens't exitst
            let unregistedPatient = allPatients.find((o) => o.name === "Unregistered Patient Record");
            unregistedPatient.previousAppointments.push(data);
            let patientData = await patients.findByIdAndUpdate(unregistedPatient._id,unregistedPatient,{new:true})
            console.log(patientData);
            // add appointment to the unregistered users patient 
        }
        // send success message 
        res.send({message:`Appointment Archived - ${data}`});
        }else{console.log("Error")};
});



// delete an appointment
exports.deleteAppointment = asyncHandler( async function(req,res){
    let id = {"_id":req.params.id}// id of item to remove 
    // remove item from the database
    let data = await appointment.findOneAndRemove(id);
    if(res.statusCode === 200){// on success
        // send success response
        res.send(`Appointment Removed -${data._id}`);
        }else{console.log("Error")};
})
