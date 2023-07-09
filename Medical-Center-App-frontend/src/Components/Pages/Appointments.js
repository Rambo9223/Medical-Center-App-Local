/* page to deal with appiontment queries 
if patient? patient can only search their own appointments
if admin? admin can serach all, and edit some details and delete
if doctor? search all, edit some details archive but not delete */

//import react hooks
import { useState,useEffect } from "react";
//page routes for each possible user
import PatientAppointment from "./PatientAppoint";
import DoctorAdminAppointment from "./DoctorAdminAppoint";

const Appointments = () => {
  // retrieve stored info from local storage
  let stored = JSON.parse(localStorage.getItem("user"));
  // usestates for the token and the logged in user info
  const [loggedIn,setLoggedIn] = useState("");
  const [token,setToken] = useState("");

  // once stored is parsed the below useEffect with update 
  //state variables 
  useEffect(()=>{
  if(token===""&&loggedIn===""&&stored!==null){
    setToken(stored.token)
    setLoggedIn(stored.loggedIn);
    }
},[token,loggedIn,stored])

    // return the page appropriate to the user that is logged in
    return <>
    {(loggedIn.address)?<PatientAppointment loggedIn={loggedIn} token={token}/>:null}
    {(loggedIn.position)?<DoctorAdminAppointment loggedIn={loggedIn} token={token}/>:null}
    </>
  };
  
  export default Appointments;