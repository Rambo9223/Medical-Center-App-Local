const mongoose = require("mongoose");

// the schema for new patient entries

// address schema
let addressSchema = mongoose.Schema({
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    postcode:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
})

let patientSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    },
    address:{
        type:addressSchema,
        required:true
    },
    previousAppointments:{
        type:Array,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("patient",patientSchema);