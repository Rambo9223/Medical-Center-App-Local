import { useState,useEffect } from "react";//import hooks
import UserSearch from "./UserSearch";// search component

/* Much like the patient component, we use the 
same logic to retrieve our user info and token 
to pass them as props to our UserSearch page */

const Users = () => {

  let stored = JSON.parse(localStorage.getItem("user"));
  const [loggedIn,setLoggedIn] = useState("");
  const [token,setToken] = useState("");

  useEffect(()=>{
  if(token===""&&loggedIn===""&&stored!==null){
    setToken(stored.token)
    setLoggedIn(stored.loggedIn);
    } 
},[token,loggedIn,stored])
    // note only admins can see the user search page
    return <>
    {(loggedIn.position==="Admin")?<UserSearch token={token}/>:null}
    </>
  };
  
  export default Users;