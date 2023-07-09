const express = require("express"); // import express 
const router = express.Router(); // import the express router

// import the user controller functions to apply routes
const users = require("../controllers/users.controller");
const appointments =  require("../controllers/appointments.controller");
const patients = require("../controllers/patient.controller");

// user routes

// get user 
router.post("/user",users.findUser);

// add a new user to database only admins
router.post("/user/new",users.create);

// update user details via id
router.put("/user/:id/update",users.updateUser);

// delete an user supplying the id 
router.delete("/user/:id/delete",users.deleteById);

// appointment routes 

// new appointment
router.post("/appointment/new",appointments.createAppointment);

// find appointments doctors 
router.post("/appointment/doctor",appointments.findAppointmentDoctor);

//find appointments patients
router.post("/appointment/patient",appointments.findAppointmentPatient);

// find appointments admins
router.post("/appointment/admin",appointments.findAppointmentAdmin);

// update appointment
router.put("/appointment/:id/update",appointments.updateAppointment);

//archive appointment to patient record

router.put("/appointment/:id/archive",appointments.archiveAppointment);

//delete appointment 
router.delete("/appointment/:id/delete",appointments.deleteAppointment)

// patient routes

// create new patient admins
router.post("/patient/new",patients.createNewPatient);

// find patient record
router.post("/patient/find",patients.findPatientRecord);

// find patient record admin
router.post("/patient/findAdmin",patients.findPatientRecordAdmin);

// edit patient record 
router.put("/patient/:id/update",patients.updatePatientRecord);

// delete patient record
router.delete("/patient/:id/delete",patients.deletePatientRecord);


// export the router
module.exports = router;