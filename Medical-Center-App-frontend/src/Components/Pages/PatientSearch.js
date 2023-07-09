// import hooks, images and bootstrap components
import { useState,useRef,useEffect } from "react";
import logo2 from "../Images/2.png";
import { Search,InfoCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button"
// import backend async functions
import FindPatient from "../Backend-Async-Functions/Patient/FindPatient";
import FindPatientAdmin from "../Backend-Async-Functions/Patient/PatientAdmin/FindPatientAdmin";
import DeletePatient from "../Backend-Async-Functions/Patient/PatientAdmin/DeletePatient";
// import forms
import AddPatient from "../Forms/AddPatient";
import EditPatientForm from "../Forms/EditPatientForm";

// the patient search component searches the patitent section of the db
const PatientSearch = (props) => {

    //patients holds array of returned objects from DB 
    const [patients,setPatients] = useState([]);
    const [filter,setFilter] = useState("");// filter to query db
    const searchRef = useRef();//user text input 

    // props recieved from Patient component

    let token = props.token;//jwt token
    let loggedIn = props.loggedIn;// user details

    /* HideSearch modifies the html of the page based on how the 
    user wishes to query the database */
    const HideSearch = () => {
    let result = (document.getElementById("filters").value)
    let text = searchRef.current;
    // if querying all or unregisterd patients
    if(result==="{}"||result==="unregistered"){
      text.hidden = true; // hide search bar
    }
    //else show search bar
    else{
      text.hidden = false;
    }
    }

    /* Handle filter deals with the users input for 
    querying the db and sets the filter to send to the 
    server */
    const HandleFilter = () =>{
      let filter ="";

      // value from select html element 
      let filterQuery = document.getElementById("filters").value;
      // value from search bar
      let filterFilter = document.getElementById("form1").value;
      if(filterQuery==="name"){//if query by name
        filter = {query:filterQuery,filter:filterFilter}
      }else if(filterQuery==="unregistered"){// query by unregistered
        filter = {query:"name",filter:"Unregistered Patient Record"}
      }// query all
      else if (filterQuery==="{}"){
        filter = {}
      }
      // update useState varable filter
      setFilter(filter);
    }
    
    /* When useState filter is updated the below
    useEffect code will run and pass the token 
    and filter to the respective function to find patients
    for each user type 
    In the returned objects doctors will be able to see the 
    doctor/patient notes from the appointment but admins will not*/
    useEffect(() => {
        const interval = setInterval(() => {
            if(loggedIn.position==="Doctor"&&filter!==""){
                // doctors route
                FindPatient(token,filter)
              .then((res) => {
                  setPatients(res)
              })
              .catch((e) => {
                  console.log(e.message)
              });
            }else if (loggedIn.position==="Admin"&& filter!==""){
                // admin route
                FindPatientAdmin(token,filter)
              .then((res) => {
                  setPatients(res)
              })
              .catch((e) => {
                  console.log(e.message)
              });
              }
          }, 1000);
          return () => clearInterval(interval);
      
    },)

/* We return the page, the Addpatient component so user can
  create a new patient,
  the search bar & select elements & button to call HandleFilter on click */
  return (<>
  <h1>Patients</h1>
  <div className="add-new-container">
  <AddPatient token={token}/>
  </div>
  <h2>Find Patient</h2>
  <div className="search-queries">
  <select onChange={HideSearch} className="form-select-md" id="filters" aria-label="Default select example">
  <option defaultValue={""}>Filter by:</option>
  <option value={"{}"}>All</option>
  <option value="name">Patient Name</option>
  <option value="unregistered">Unregistered</option>
</select> 
  <div className="input-group">
  <div className="form-outline">
  <input ref={searchRef} type="search" id="form1" className="form-control" placeholder="Search"/>
  </div>
</div>
<Button onClick={()=>{HandleFilter()}} type="button" className="btn btn-primary">
  Search <Search/>
</Button>
<br></br>
</div>
{/*Once Clicked the async function will retrieve an array of 
objects that are stored in the patients useState variable
once stored we map each item to show the contents */}
{(patients.length>0)?(patients.map((patient)=>{

return (

<>
<div className="card" key={patient._id}>
<div>
<img src={logo2} height={"200px"} width={"200px"}  alt="logo"/>
</div>
<div className="card-body">
<ul className="list-group list-group-flush" key={patient._id}>
<li className="list-group-item"><strong>Patient:</strong>{patient.name}</li>
<li className="list-group-item"><strong>Age:</strong>{patient.age}</li>
<li className="list-group-item"><strong>Gender:</strong>{patient.gender}</li>
<li className="list-group-item"><strong>Contact Number:</strong>{patient.contactNumber}</li>
<li className="list-group-item"><strong>Username:</strong>{patient.username}</li>
<ul className="list-group list-group-flush" key={patient.address._id}>
    <li className="list-group-item"><strong>Address:<InfoCircle
onClick={()=>{
    document.getElementById(`address-${patient.name}`).hidden = !(document.getElementById(`address-${patient.name}`).hidden)
}}/></strong></li>
<div id={`address-${patient.name}`} hidden={true}>
<li className="list-group-item" ><strong>Street:</strong>{patient.address.street}</li>
<li className="list-group-item" ><strong>City:</strong>{patient.address.city}</li>
<li className="list-group-item" ><strong>Postcode:</strong>{patient.address.postcode}</li>
<li className="list-group-item" ><strong>Country:</strong>{patient.address.country}</li>
</div>
</ul>
<li className="list-group-item"><strong>Previous Appointments:<InfoCircle
onClick={()=>{
    document.getElementById(`appointment-container-${patient.name}`).hidden = !(document.getElementById(`appointment-container-${patient.name}`).hidden)
}}/></strong></li>
<div id={`appointment-container-${patient.name}`} hidden={true}>
{(patient.previousAppointments!==Object())? patient.previousAppointments.map((appointment)=>{
    return (
    <div classname="black-border-box">
    <ul className="list-group list-group-flush" key={appointment._id}>
    <li className="list-group-item"><strong>Appointment:</strong>{appointment.dateTime}</li>
    {(document.getElementById("filters").value==="unregistered")?
    <li className="list-group-item"><strong>Patient:</strong>{appointment.patient}</li>:null}
    <li className="list-group-item"><strong>Doctor:</strong>{appointment.doctor}</li>
    {(appointment.appointmentNotes)?<li className="list-group-item"><strong>Appointment notes:</strong>{appointment.appointmentNotes}</li>:null}
    {(appointment.followUpNotes)?<li className="list-group-item"><strong>Follow up notes:</strong>{appointment.followUpNotes}</li>:null}
    </ul>
    </div>
)
}):null}
</div>
</ul>
</div>
<div className="action-container">
{/* below each item we render the actionable components and buttons the
user can click to perform the update, archive or delete options
Note only admins have the ability to perform these actions */}
{(loggedIn.position==="Admin")?<>
<EditPatientForm token={token} patient={patient} />
<Button variant="danger" id="delete-patient" onClick={()=>{DeletePatient(patient._id,token).then((res)=>{
    alert(res)
})}}>Delete Patient</Button></>:null}

</div>
</div>
<br/>
</>
)})):null}
  </>)
  }
export default PatientSearch