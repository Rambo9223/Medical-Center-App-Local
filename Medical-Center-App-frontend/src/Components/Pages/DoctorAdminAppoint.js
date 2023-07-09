// import async function to communicate with express server
import FindAppointmentDoctor from "../Backend-Async-Functions/Appointment/FindAppointmentDoctor";
import FindAppointmentAdmin from "../Backend-Async-Functions/Appointment/FindAppointmentAdmin";
import DeleteAppointment from "../Backend-Async-Functions/Appointment/DeleteAppointment";
import ArchiveAppointment from "../Backend-Async-Functions/Appointment/ArchiveAppointment";
// import the forms for adding and editing 
import AddAppointment from "../Forms/AddAppointment";
import EditAppointment from "../Forms/EditAppointment";
// import hooks
import { useState,useRef,useEffect } from "react";
// import images,logos and Bootstrap components
import logo2 from "../Images/2.png";
import { Search,InfoCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button"

const DoctorAdminAppointment = (props) => {
    // component recieves the token & logged in user object as props
    let token = props.token;
    let loggedIn = props.loggedIn;

    //appointments holds array of returned objects from DB 
    const [appointments,setAppointments] = useState();
    const [filter,setFilter] = useState("");// filter to query the DB
    const searchRef = useRef();// The user text query
    
    /* HideSearch modifies the html of the page based on how the 
    user wishes to query the database */
    const HideSearch = () => {
    let result = (document.getElementById("filters").value==="dateTime")
    let text = searchRef.current;
    let date1 = document.getElementById("date-label-1");
    let date2 = document.getElementById("date-label-2");
    // if querying by date
    if(result===true){
      // hide search bar
      text.hidden = true;
      // show date selectors
      date1.hidden = false;
      date2.hidden = false;

      //if querying by all 
    }else if(document.getElementById("filters").value==="{}"){
      // hide all
      text.hidden = true;
      date1.hidden = true;
      date2.hidden = true;
    }
    else{
      // else show seach bar & hide dates
      text.hidden = false;
      date1.hidden = true;
      date2.hidden = true;
    }
    }

    /* Handle filter deals with the users input for 
    querying the db and sets the filter to send to the 
    server */
    const HandleFilter = () =>{
      let filter ="";//initialise filter

      // value from the select html options
      let filterQuery = document.getElementById("filters").value;
      // value from the search bar
      let filterFilter = document.getElementById("form1").value;
      // date selector values
      let date_1 = document.getElementById("date1").value;
      let date_2 = document.getElementById("date2").value;
      //if query isnt date or all
      if(filterQuery!=="dateTime"&&filterQuery!=="{}"){
        filter = {query:filterQuery,filter:filterFilter}
      // else if filter all 
      }else if(filterQuery==="{}"){
        filter = {}
      // else if filer query is achrived true or false
      }else if(filterQuery==="archived"){
        if(filterFilter.includes("true")){
          filterFilter = true;
        }else{filterFilter=false}
      }
      //else filter is a date query
      else{
        filter = {query:filterQuery,date_1:date_1,date_2:date_2}
      }
      // update usestate filter
      setFilter(filter);

    }
    /* When useState filter is updated the below
    useEffect code will run and pass the token 
    and filter to the respective function to find appointments
    for each user type 
    In the returned objects doctors will be able to see the 
    doctor/patient notes from the appointment but admins will not*/
    useEffect(() => {
        const interval = setInterval(() => {
            if(loggedIn.position==="Doctor"&&filter!==""){
                FindAppointmentDoctor(token,filter)
              .then((res) => {
                  setAppointments(res)
              })
              .catch((e) => {
                  console.log(e.message)
              });
            }else if (loggedIn.position==="Admin"&& filter!==""){
                FindAppointmentAdmin(token,filter)
              .then((res) => {
                  setAppointments(res)
              })
              .catch((e) => {
                  console.log(e.message)
              });
              }
          }, 1000);
          return () => clearInterval(interval);
    },)

  /* We return the page with the AddAppointment component so user can
  create a new appointment,
  the search bar & select elements & button to call HandleFilter on click */
  return (<>
  <h1>Appointments</h1>
  <div className="add-new-container">
  <AddAppointment token={token}/>
  </div>
  <h2>Find Appointments</h2>
  <div className="search-queries">
  <select onChange={HideSearch} className="form-select-md" id="filters" aria-label="Default select example">
  <option defaultValue={""}>Filter by:</option>
  <option value={"{}"}>All</option>
  <option value="patient">Patient</option>
  <option value="doctor">Doctor</option>
  <option value="dateTime">Date</option>
  <option value="_id">Id</option>
  <option value="archived" >Archived</option>
</select> 
  <div className="input-group">
  <div className="form-outline">
  <input maxLength={20} ref={searchRef} type="search" id="form1" className="form-control" placeholder="Search"/>
    <label hidden={true} id="date-label-1">Start Date:
    <input type="date" id="date1" className="form-control"/>
    </label>
    <label hidden={true} id="date-label-2">End Date:
    <input type="date" id="date2" className="form-control"/>
    </label>
  </div>
</div>
<Button onClick={()=>{HandleFilter()}} type="button" className="btn btn-primary">
  Search <Search/>
</Button>
<br></br>
<div>
<h6>Note to Doctors:<InfoCircle onClick={()=>{
                document.getElementById("doctor-note").hidden = !(document.getElementById("doctor-note").hidden)
            }}/> <span hidden={true} id="doctor-note">Once follow up notes are added to the appointment please archive.</span></h6>
            <h6>Note to Admin: <InfoCircle onClick={()=>{
                document.getElementById("admin-note").hidden = !(document.getElementById("admin-note").hidden)
            }}/> <span hidden={true} id="admin-note">If appointment archived parameter is true, it can be deleted from the appointments list.</span></h6>
</div>
</div>
{/*Once Clicked the async function will retrieve an array of 
objects that are stored in the appointments useState variable
once stored we map each item to show the contents */}
{(appointments)?(appointments.map((appointment)=>{

return (
<>
<div className="card" key={appointment._id}>
<div>
<img src={logo2} height={"200px"} width={"200px"}  alt="logo"/>
</div>
<div className="card-body">
<ul className="list-group list-group-flush" key={appointment._id}>
<li className="list-group-item"><strong>Id: </strong>{appointment._id}</li>
<li className="list-group-item"><strong>Patient: </strong>{appointment.patient}</li>
<li className="list-group-item"><strong>Doctor: </strong>{appointment.doctor}</li>
<li className="list-group-item"><strong>Date/Time: </strong>{appointment.dateTime}</li>

{(appointment.appointmentNotes)?<li className="list-group-item"><strong>Appointment notes: </strong>{appointment.appointmentNotes}</li>:null}
{(appointment.followUpNotes)?<li className="list-group-item"><strong>Follow up notes: </strong>{appointment.followUpNotes}</li>:null}
<li className="list-group-item"><strong>Archived: </strong>{(appointment.archived!==undefined)?String(appointment.archived):"N/A"}</li>

</ul>
</div>
<div className="action-container">
{/* below each item we render the actionable components and buttons the
user can click to perform the update, archive or delete options */}
{(appointment.archived===false)?<EditAppointment token={token} user={loggedIn.position} appointment={appointment}/>:null}
{(loggedIn.position==="Doctor"&&appointment.archived===false)?<Button variant="success" onClick={()=>{ArchiveAppointment(appointment._id,appointment,token).then((res)=>{
        alert(JSON.stringify(res));
      }).catch((err)=>{// on reject alert error
          alert(err);
      }) }}>Archive Appointment</Button>:null}
{(loggedIn.position==="Admin")?
<Button variant="danger" id="delete-appointment" onClick={()=>{DeleteAppointment(appointment._id,token).then((res)=>{alert(JSON.stringify(res))})}}>Delete Appointment</Button>:null}
</div>
</div>
<br/>
</>
)})):null}
  </>)
  }
export default DoctorAdminAppointment