// import hooks
import {  useState } from "react";
// bootstrap modal & button for display
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import async function to pass data to server 
import NewPatient from "../Backend-Async-Functions/Patient/PatientAdmin/NewPatient";

/* AddPatient uses the same logic as AddAppointment, 
the user fills in a modal form to create a new patient item, 
on submit if all required fields are entered the item is passed to the server to the patient database */

function AddPatient(props) {
  
  let token = props.token;

  const [patientName,setPatientName] = useState("");
  const [age,setAge] = useState("");
  const [gender,setGender] = useState("");
  const [contactNumber,setContactNumber] = useState("");
  const [street,setStreet] = useState("");
  const [city,setCity] = useState("");
  const [postcode,setPostCode] = useState("");
  const [country,setCountry] = useState("");
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  

 
  const [bool, setBool] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function ToggleBool() {
    if (bool === true && submitted === true) {
      setSubmitted(false);
        setPatientName("");
        setAge("")
      setCity("");
      setContactNumber("");
      setCountry("");
      setGender("");
      setPostCode("");
      setStreet("");
      setUserName("");
      setPassword("")
    }
    setBool(!bool);
  }
  
  const HandleSubmit = () => {
    if(patientName&&age&&gender&&contactNumber&&username&&password&&street&&city&&postcode&&country){
    
    let item = {
      name:patientName,
      age:Number(age),
      gender:gender,
      contactNumber:contactNumber,
      address:{
        street:street,
        city:city,
        postcode:postcode,
        country:country
      },
      previousAppointments:[],
      username:username,
      password:password
    }
    
    NewPatient(token,item).then((res)=>{
      alert(JSON.stringify(res));
    if(!JSON.stringify(res).includes("Error")){setSubmitted(true);}
    }).catch((err)=>{
        alert(err);
    })  
  }else{
    alert("You must fill in all fields before adding a new patient!")
  }  
    
  };

  return (
    <>
      <div className="add-container">
        <Button onClick={ToggleBool} variant="success" id="add-button">
          Create New Patient
        </Button>
      </div>
      <div className="new-project">
        <Modal show={bool} onHide={ToggleBool}>
          <Modal.Header closeButton>
            <Modal.Title>New Patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submitted === false ? (
            <form className="new-item-form">
            <label className="form-labels">Name:</label>
            <input className="form-inputs" type="text"
            id="patient"
            value={patientName}
            placeholder="Patient Name"
            onChange={(e)=>{setPatientName(e.target.value)}}/><br/>
            <label className="form-labels">Age:</label>
            <input className="form-inputs" type="text"
            id="age"
            value={age}
            placeholder="Patient Age"
            onChange={(e)=>{setAge(e.target.value)}}/><br/>
            <label className="form-labels">Gender:</label>
            <input className="form-inputs" type="text"
            value={gender}
            placeholder="Patient Gender"
            id="gender"
            onChange={(e)=>{setGender(e.target.value)}}/><br/>

            <label className="form-labels">Contact Number:</label><br></br>
            <input className="form-inputs" type="text"
            id="contact-number"
            value={contactNumber}
            placeholder="Patient Contact Number"
            onChange={(e)=>{setContactNumber(e.target.value)}}/><br/>

            <label className="form-labels">Address:</label><br></br>
            <label className="form-labels">Street:</label>
            <input className="form-inputs" type="text"
            id="street"
            placeholder="Enter Steet Name"
            value={street}
            onChange={(e)=>{setStreet(e.target.value)}}/><br/>
            <label className="form-labels">City:</label><br></br>
            <input className="form-inputs" type="text"
            id="city"
            placeholder="Enter City Name"
            value={city}
            onChange={(e)=>{setCity(e.target.value)}}/><br/>

            <label className="form-labels">Postcode:</label><br></br>
            <input className="form-inputs" type="text"
            id="postcode"
            placeholder="Enter Postcode"
            value={postcode}
            onChange={(e)=>{setPostCode(e.target.value)}}/><br/>
            <label className="form-labels">Country:</label><br></br>
            <input className="form-inputs" type="text"
            id="country"
            placeholder="Enter Country"
            value={country}
            onChange={(e)=>{setCountry(e.target.value)}}/><br/>
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
                  Add Patient
                </Button>
              </form>
            ) : (
              <>
                <h4>Patient Added</h4>
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
export default AddPatient;