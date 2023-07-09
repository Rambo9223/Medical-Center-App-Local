
import { useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditPatient from "../Backend-Async-Functions/Patient/EditPatient";

/* EditPatientForm uses the same logic as AddAppointment/Patient/User with only one difference
When the user clicks the item they with to edit 
the modal opens with the item values already in the 
form inputs, the user will update the patient record as nesseccary ,on submit if all required fields are entered the record is updated in the patient database */

function EditPatientForm(props) {

  let token = props.token;
  let patientEdit = props.patient;

  const [patient,setPatient] = useState(patientEdit.name);
  const [contactNumber,setContactNumber] = useState(patientEdit.contactNumber);
  const [gender,setGender] = useState(patientEdit.gender);
  const [street,setStreet] = useState(patientEdit.address.street);
  const [city,setCity] = useState(patientEdit.address.city);
  const [postcode,setPostCode] = useState(patientEdit.address.postcode);
  const [country,setCountry] = useState(patientEdit.address.country);
  const [username,setUserName] = useState(patientEdit.username);

  const [bool, setBool] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function ToggleBool() {
    if (bool === true && submitted === true) {
      setSubmitted(false);
    }
    setBool(!bool);
  }

  const HandleSubmit = () => {
    let item

    if(patient&&gender&&contactNumber&&username){
      
        item = {
            name:patient,
            gender:gender,
            contactNumber:contactNumber,
            address:{
                street:street,
                city:city,
                postcode:postcode,
                country:country
            },
            username:username,
          }
      Update(patientEdit._id,item,token);
  }
  else{
    alert("You must fill in all fields before editing an appointment!")
  }  
    
  };

  const Update = (id,item,token) => {
    EditPatient(id,item,token).then((res)=>{
        alert(JSON.stringify(res));
        setSubmitted(true);
      }).catch((err)=>{
          alert(err);
      }) 
  }
  

  
  return (
    <>
      <div className="add-container">
        <Button onClick={ToggleBool} variant="warning" id="add-button">
          Edit Patient
        </Button>
      </div>
      <div className="new-project">
        <Modal show={bool} onHide={ToggleBool}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submitted === false ? (
            <form className="new-item-form">
            <label className="form-labels">Patient:</label>
            <input className="form-inputs" type="text"
            id="patient"
            value={patient}
            onChange={(e)=>{setPatient(e.target.value)}}
            /><br/>
            <label className="form-labels">Gender:</label>
            <input className="form-inputs" type="text"
            id="gender"
            value={gender}
            onChange={(e)=>{setGender(e.target.value)}}/><br/>
            <label className="form-labels">Contact Number:</label><br></br>
            <input className="form-inputs" type="text"
            id="contact-number"
            value={contactNumber}
            onChange={(e)=>{setContactNumber(e.target.value)}}/><br/>
            <label className="form-labels">Address:</label><br></br>
            <label className="form-labels">Street:</label>
            <input className="form-inputs" type="text"
            id="street"
            value={street}
            onChange={(e)=>{setStreet(e.target.value)}}/><br/>
            <label className="form-labels">City:</label><br></br>
            <input className="form-inputs" type="text"
            id="city"
            value={city}
            onChange={(e)=>{setCity(e.target.value)}}/><br/>

            <label className="form-labels">Postcode:</label><br></br>
            <input className="form-inputs" type="text"
            id="postcode"
            value={postcode}
            onChange={(e)=>{setPostCode(e.target.value)}}/><br/>
            <label className="form-labels">Country:</label><br></br>
            <input className="form-inputs" type="text"
            id="country"
            value={country}
            onChange={(e)=>{setCountry(e.target.value)}}/><br/>
            <label className="form-labels">Username:</label>
            <input className="form-inputs" type="text"
            id="username"
            value={username}
            onChange={(e)=>{setUserName(e.target.value)}}/><br/>
            
                <Button variant="primary" onClick={HandleSubmit} type="button">
                  Edit Record
                </Button>
              </form>
            ) : (
              <>
                <h4>Patient Record Edited</h4>
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
export default EditPatientForm;