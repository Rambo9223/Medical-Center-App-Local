// import useState to contain user input for new Todo
import { useState } from "react";
// modal & button for display
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NewUser from "../Backend-Async-Functions/User/Admin/NewUser";

/* AddUser uses the same logic as AddAppointment/AddPatient, 
the user fills in a modal form to create a new user item, 
on submit if all required fields are entered the item is passed to the server to the user database */

function AddUser(props) {
  
  let token = props.token;
  const [name,setName] = useState("");
  const [position,setPosition] = useState();
  const [contactNumber,setContactNumber] = useState("");
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  
  const [bool, setBool] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function ToggleBool() {
    if (bool === true && submitted === true) {
      setSubmitted(false);
        setName("");
        setContactNumber("");
        setUserName("");
        setPassword("")
    }
    setBool(!bool);
  }
 
  const HandleSubmit = () => {
    let date = document.getElementById("user-start-date").value;
    let dbDate = new Date((`${date}UTC`));
    if(name&&position&&contactNumber&&date&&username&&password){
    
    let item = {
      name:name,
      position:position,
      contactNumber:contactNumber,
      startDate:dbDate.toISOString(),
      username:username,
      password:password
    }
    
    NewUser(token,item).then((res)=>{
      alert(JSON.stringify(res));
    if(!JSON.stringify(res).includes("Error")){setSubmitted(true);}
    }).catch((err)=>{// on reject alert error
        alert(err);
    })
  }else{
    alert("You must fill in all fields before adding a new user!")
  }  
    
  };

  
  return (
    <>
      <div className="add-container">
        <Button onClick={ToggleBool} variant="success" id="add-button">
          Create New User
        </Button>
      </div>
      <div className="new-project">
        <Modal show={bool} onHide={ToggleBool}>
          <Modal.Header closeButton>
            <Modal.Title>New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submitted === false ? (
            <form className="new-item-form">
            <label className="form-labels">Name:</label>
            <input className="form-inputs" type="text"
            id="user"
            value={name}
            placeholder="Users Name"
            onChange={(e)=>{setName(e.target.value)}}/><br/>

            <label className="form-labels">Position:</label><br></br>
            <label className="form-labels">Doctor - <input className="form-inputs" type="radio" name="job"
            id="Doctor"
            value={"Doctor"}
            onClick={(e)=>{setPosition(e.target.value)}}/></label>
            
            <br/>
            <label className="form-labels">Admin - <input className="form-inputs" type="radio" name="job"
            id="Admin"
            value={"Admin"}
            onClick={(e)=>{setPosition(e.target.value)}}/></label>
            <br></br>


            <label className="form-labels">Contact Number:</label><br></br>
            <input className="form-inputs" type="text"
            id="contact-number"
            value={contactNumber}
            placeholder="User Contact Number"
            onChange={(e)=>{setContactNumber(e.target.value)}}/><br/>

            <label className="form-labels">Start Date:</label><br></br>
            <input className="form-inputs" type="date"
            id="user-start-date"
            /><br/>

            <label className="form-labels">Username:</label>
            <input className="form-inputs" type="text"
            id="username"
            value={username}
            placeholder="Enter Username"
            onChange={(e)=>{setUserName(e.target.value)}}/><br/>
            <label className="form-labels">Password:</label>
            <input className="form-inputs" type="text"
            id="password"
            value={password}
            placeholder="Enter Initial Password"
            onChange={(e)=>{setPassword(e.target.value)}}/><br/>

                <Button variant="primary" onClick={HandleSubmit} type="button">
                  Add User
                </Button>
              </form>
            ) : (
              <>
                <h4>User Added</h4>
                <p>You can now close this window.</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={ToggleBool}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
export default AddUser;