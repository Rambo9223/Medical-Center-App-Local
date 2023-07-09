
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UpdateAppointment from "../Backend-Async-Functions/Appointment/UpdateAppointment";


/* EditAppointment uses the same logic as AddAppointment/Patient/User with only one difference
When the user clicks the item they with to edit 
the modal opens with the item values already in the 
form inputs, the user will update the appointment as nesseccary ,on submit if all required fields are entered the appointment is updated in the appointment database */

function EditAppointment(props) {
  let token = props.token;
  let appointment = props.appointment;
  let user = props.user

  const patient = appointment.patient;
  const [doctor,setDoctor] = useState(appointment.doctor);
  const dateTime = appointment.dateTime;
  const [date,setDate] = useState("");
  const [time,setTime] = useState("");
  const [appointmentNotes,setAppointmentNotes] = useState((appointment.appointmentNotes)?appointment.appointmentNotes:"");
  const [followUpNotes,setFollowUpNotes] = useState((appointment.followUpNotes)?appointment.followUpNotes:"");

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
    // if user is changing the date and time
    if(patient&&doctor&&date&&time){
    
    let dbDateTime = new Date((`${date} ${time} UTC`));
    if(user==="Doctor"){
    item = {
      patient:patient,
      doctor:doctor,
      dateTime:dbDateTime.toISOString(),
      appointmentNotes:appointmentNotes,
      followUpNotes:followUpNotes,
      archived:false
    }}
    else{// user is admin
        item = {
            patient:patient,
            doctor:doctor,
            dateTime:dbDateTime.toISOString(),
            archived:false
    }
    }
    Update(appointment._id,item,token);

  // user is not editing date or time
  }else if(patient&&doctor&&!date&&!time){
    
    if(user==="Doctor"){
        item = {
          patient:patient,
          doctor:doctor,
          dateTime:dateTime,
          appointmentNotes:appointmentNotes,
          followUpNotes:followUpNotes,
          archived:false
        }}
        else{// admin
            item = {
                patient:patient,
                doctor:doctor,
                dateTime:dateTime,
                archived:false
        }}
      Update(appointment._id,item,token);
  }
  else{
    alert("You must fill in all fields before editing an appointment!")
  }  
    
  };

  const Update = (id,item,token) => {
    UpdateAppointment(id,item,token).then((res)=>{
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
          Edit Appointment
        </Button>
      </div>
      <div className="new-project">
        <Modal show={bool} onHide={ToggleBool}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submitted === false ? (
            <form className="new-item-form">
            <label className="form-labels">Patient:</label>
            <input className="form-inputs" type="text"
            id="patient"
            value={patient}
            readOnly={true}
            /><br/>
            <label className="form-labels">Doctor:</label>
            <input className="form-inputs" type="text"
            id="doctor"
            value={doctor}
            placeholder="Doctor Name"
            onChange={(e)=>{setDoctor(e.target.value)}}/><br/>
            <label className="form-labels">Current Date/Time:</label><br></br>
            <input className="form-inputs" type="text"
            id="dateTime"
            value={dateTime}
            readOnly={true}
            /><br/>
            <label className="form-labels">New Date:</label><br></br>
            <input className="form-inputs" type="date"
            id="date"
            onChange={()=>{setDate(document.getElementById("date").value)}}/><br/>
            <label className="form-labels">New Time:</label><br></br>
            <input className="form-inputs" type="time"
            id="time"
            onChange={()=>{setTime(document.getElementById("time").value)}}/><br/>
            {(user==="Doctor")?
            <>
            <label className="form-labels">Appointment Notes:</label>
            <input className="form-inputs" type="text"
            id="appointment-notes"
            value={appointmentNotes}
            onChange={(e)=>{setAppointmentNotes(e.target.value)}}/><br/>

            <label className="form-labels">Follow Up Notes:</label>
            <input className="form-inputs" type="text"
            id="appointment-notes"
            value={followUpNotes}
            onChange={(e)=>{setFollowUpNotes(e.target.value)}}/><br/>
            </>:null}

            <label className="form-labels">Archived:</label>
            <input className="form-inputs" type="text"
            id="appointment-notes"
            value={String(appointment.archived)}
            readOnly={true}/><br/>
            
                <Button variant="primary" onClick={HandleSubmit} type="button">
                  Edit Appointments
                </Button>
              </form>
            ) : (
              <>
                <h4>Appointment Edited</h4>
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
export default EditAppointment;