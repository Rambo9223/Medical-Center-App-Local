// import useState hook
import { useState } from "react";
// import bootstrap modal & button for display
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button"
// import async function to pass data to server 
import NewAppointment from "../Backend-Async-Functions/Appointment/NewAppointment"

function AddAppointment(props) {
  // once logged in the token is passed to props
  // so the user has permission to add appointments
  let token = props.token;
  // usestate variables for the new entry
  const [patient,setPatient] = useState("");
  const [doctor,setDoctor] = useState("");
  const [date,setDate] = useState("");
  const [time,setTime] = useState("");
  const [appointmentNotes,setAppointmentNotes] = useState("");

  // bool & submitted is used to toggle modal
  // & handle submit of form
  const [bool, setBool] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  //Toggle bool changes bool to !bool and if both booleans are true
  // ie form submitted, we reset the form & update useStates
  function ToggleBool() {
    if (bool === true && submitted === true) {
      setSubmitted(false);
      // set use states to blank
      setPatient("");
      setDoctor("");
      setAppointmentNotes("");
    }
    setBool(!bool);
  }

  /* When form is submitted handle submit is called */
  const HandleSubmit = () => {
    // if all variables arent empty strings
    if(patient&&doctor&&date&&time&&appointmentNotes){
    // modify date and time variables with date contructor
    let dbDateTime = new Date((`${date} ${time} UTC`));
    // create new appointment object item
    let item = {
      patient:patient,
      doctor:doctor,
      dateTime:dbDateTime.toISOString(),//to ISOString is used 
      // so date is compatible with mongoDb
      appointmentNotes:appointmentNotes,
      followUpNotes:"To be completed after appointment",
      archived:false
    }
    // pass token and new item to NewAppointment
    NewAppointment(token,item).then((res)=>{
      alert(JSON.stringify(res));// alert response
      setSubmitted(true);// change modal display
    }).catch((err)=>{// on reject alert error
        alert(err);
    })  
  }else{// if fields aren't filled in alert error
    alert("You must fill in all fields before adding an appointment!")
  }  
    
  };

  /* below is the modal diplayed if user clicks New Apppointment button 
  which calls ToggleBool,
  Modal displays a form that the user can update, onChange the 
  useState variables are updated with the user input.
  When submited the HandleSubmit function is called */
  return (
    <>
      <div className="add-container">
        <Button onClick={ToggleBool} variant="success" id="add-button">
          New Appointment
        </Button>
      </div>
      <div className="new-project">
        <Modal show={bool} onHide={ToggleBool}>
          <Modal.Header closeButton>
            <Modal.Title>New Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submitted === false ? (
            <form className="new-item-form">
            <label className="form-labels">Patient:</label>
            <input className="form-inputs" type="text"
            id="patient"
            value={patient}
            placeholder="Patient Name"
            onChange={(e)=>{setPatient(e.target.value)}}/><br/>
            <label className="form-labels">Doctor:</label>
            <input className="form-inputs" type="text"
            id="doctor"
            value={doctor}
            placeholder="Doctor Name"
            onChange={(e)=>{setDoctor(e.target.value)}}/><br/>
            <label className="form-labels">Date:</label><br></br>
            <input className="form-inputs" type="date"
            id="date"
            onChange={()=>{setDate(document.getElementById("date").value)}}/><br/>
            <label className="form-labels">Time:</label><br></br>
            <input className="form-inputs" type="time"
            id="time"
            onChange={()=>{setTime(document.getElementById("time").value)}}/><br/>
            <label className="form-labels">Appointment Notes:</label>
            <input className="form-inputs" type="text"
            id="appointment-notes"
            value={appointmentNotes}
            placeholder="What does the patient wish to see the doctor about?"
            onChange={(e)=>{setAppointmentNotes(e.target.value)}}/><br/>

                <Button variant="primary" onClick={HandleSubmit} type="button">
                  Add To Appointments
                </Button>
              </form>
            ) : (
              <>
                <h4>Appointment Added</h4>
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
export default AddAppointment;
