// import our async functions 
import FindAppointmentPatient from "../Backend-Async-Functions/Appointment/FindAppointmentPatient";
// import hooks 
import { useState,useEffect } from "react";
// import images
import logo2 from "../Images/2.png";
// import bootstap icon
import { ArrowClockwise } from "react-bootstrap-icons";

/* If user is a patient, when they navigate to the appointment section 
the below page is displayed */
const PatientAppointment = (props) =>{
    // the usestate to hold appointments
    const [appointments,setAppointments] = useState();
    // props 
    let loggedIn = props.loggedIn // user who is logged in 
    let token = props.token;// jwt token

    /* the filter to pass to the async function FindAppointmentPatient
    patients can only see their own appointments so the filter is the 
    users name */
    let filter = {"query":"patient","filter":loggedIn.name};

    /*The useEffect hook passes the token and fitler to the asnyc function 
    FindAppoinmentPatient then sets the response array of objects to the 
    setAppointments variable */
    useEffect(() => {
      const interval = setInterval(() => { 
        FindAppointmentPatient(token,filter)
      .then((res) => {
          setAppointments(res)
      })
      .catch((e) => {
          console.log(e.message)
      });
        }, 1000);
        return () => clearInterval(interval);
  },)
    
    return (
    <>
    <h1>My Appointments</h1>
    {/*if the appointments variable exisits we map each object to 
    the card below. */}
    <h2>Upcoming</h2>
    {(appointments)?(appointments.map((appointment)=>{

      return <>
      <div className="card" key={appointment._id}>
      <div>
    <img src={logo2} height={"200px"} width={"200px"}  alt="logo"/>
    </div>
    <div className="card-body">
    <h5 className="card-title">Appointment</h5>
    <p className="card-text"><strong>Patient:</strong>{appointment.patient}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"><strong>Id:</strong>{appointment._id}</li>
    <li className="list-group-item"><strong>Doctor:</strong>{appointment.doctor}</li>
    <li className="list-group-item"><strong>Date/Time:</strong>{appointment.dateTime}</li>
    <li className="list-group-item"><strong>Appointment notes:</strong>{appointment.appointmentNotes}</li>
    <li className="list-group-item"><strong>Follow up notes</strong>{appointment.followUpNotes}</li>
  </ul>
</div>
<br></br>
</>})
):<><h3>Loading Appointments <ArrowClockwise/></h3></>}

   {/*Map out our previous appointments*/} 
  <h2>Previous</h2>
  {(loggedIn.previousAppointments.map((appointment)=>{

return <>
<div className="card" key={appointment._id}>
<div>
<img src={logo2} height={"200px"} width={"200px"}  alt="logo"/>
</div>
<div className="card-body">
<h5 className="card-title">Appointment</h5>
<p className="card-text"><strong>Patient:</strong>{appointment.patient}</p>
</div>
<ul className="list-group list-group-flush">
<li className="list-group-item"><strong>Doctor:</strong>{appointment.doctor}</li>
<li className="list-group-item"><strong>Date/Time:</strong>{appointment.dateTime}</li>
<li className="list-group-item"><strong>Appointment notes:</strong>{appointment.appointmentNotes}</li>
<li className="list-group-item"><strong>Follow up notes</strong>{appointment.followUpNotes}</li>
</ul>
</div>
<br></br>
</>})
)}
    </>)

  }

export default PatientAppointment