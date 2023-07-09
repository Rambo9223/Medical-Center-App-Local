// import express and mongoose
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
// import helmet for security
const helmet = require("helmet");
const {checkContent, checkJWTToken} = require("./routes/middleware");
// for testing purposes
// cors allow cross environment communication
var cors = require("cors");
app.use(cors());
// welcome route for testing purposes
app.get('/welcome', (req,resp)=>{
    resp.status(200).send({message:"Welcome to the server!"});
})


app.use(express.static(path.join(__dirname, 'Medical-Center-App-frontend/build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'Medical-Center-App-frontend/build', 'index.html'),function(err){
    res.status(500).send(err);
  });
});

// require dotenv file 
require("dotenv").config();

// our path to our db is in our env file as DATABASE_URL
const mongoString = process.env.DATABASE_URL
// we load the routes from the routes.js file
const routes = require("./routes/routes");
const session = require("./routes/session")
// load our body parser to pass data from the frontend
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(helmet())

// load our base path and our routes with middleware applied
app.use('/clinic',checkContent,checkJWTToken,routes);
app.use('/',checkContent,session)
// set our app to pass only json 
app.use(express.json());
// use port 5000 
const port = process.env.PORT || 5000 

// database is the default connection to mongoose
const database = mongoose.connection
mongoose.Promise = global.Promise;

// connect to our database 
mongoose.connect(mongoString,{
    dbName:"Clinic-Database",
});


// check database is connected
database.on("error",(error)=>{
    console.log(error);
});
database.once("connected",()=>{
    app.listen(port,()=>{
        console.log(`Server running on Port ${port}`);
    })
    console.log("Database Connected");
})






module.exports = app;
