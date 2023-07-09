const mongoose = require("mongoose");

// the schema for the new appointment entry for doctor and admins

let appointmentSchema = mongoose.Schema({

    patient:{
        type:String,
        required:true
    },
    doctor:{
        type:String,
        required:true
    },
    dateTime:{
        type:Date,
        required:true
    },
    appointmentNotes:{
        type:String,
        required:true
    },
    followUpNotes:{
        type:String,
        required:true
    },
    archived:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model("appointment",appointmentSchema);