// import hooks 
import { useState,useEffect } from "react";
// import search component
import PatientSearch from "./PatientSearch";

const Patients = () => {
  // local storage item
  let stored = JSON.parse(localStorage.getItem("user"));
  // logged in user datails 
  const [loggedIn,setLoggedIn] = useState("");
  //jwt token
  const [token,setToken] = useState("");

  /* As before in the nav bar function we update our useState 
  variables in page load */
  useEffect(()=>{
  if(token===""&&loggedIn===""&&stored!==null){
    setToken(stored.token)
    setLoggedIn(stored.loggedIn);
    }
},[token,loggedIn,stored])
    // if Admin or Doctor logged in(loggedIn.position exists)
    // return the PatientSearch component with props passed to it
    return <>
    {(loggedIn.position)?<PatientSearch loggedIn={loggedIn} token={token}/>:null}
    </>
  };
  
  export default Patients;