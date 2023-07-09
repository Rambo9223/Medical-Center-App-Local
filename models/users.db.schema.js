const mongoose = require("mongoose");

// the schema for a new user entry for new doctor or admin accounts 

let userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    // date in the following format 2023-06-27
    startDate:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model("user",userSchema);