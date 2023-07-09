import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EditUser from "../Backend-Async-Functions/User/EditUser";

/* EditUserForm uses the same logic as AddAppointment/Patient/User with only one difference
When the user clicks the item they with to edit 
the modal opens with the item values already in the 
form inputs, the user will update the user record as nesseccary ,on submit if all required fields are entered the record is updated in the users database */

function EditUserForm(props) {

  let token = props.token;
  let user = props.user;


  const object = user;  
  const [name,setName] = useState(user.name);
  const [contactNumber,setContactNumber] = useState(user.contactNumber);
  const [username,setUserName] = useState(user.username);

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

    if(name&&contactNumber&&username){
        item = {
            name:name,
            contactNumber:contactNumber,
            username:username,
          }
      Update(object._id,item,token);
  }
  else{
    alert("You must fill in all fields before editing the user record!")
  }  
    
  };

  const Update = (id,item,token) => {
    EditUser(id,item,token).then((res)=>{
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
          Edit User
        </Button>
      </div>
      <div className="new-project">
        <Modal show={bool} onHide={ToggleBool}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submitted === false ? (
            <form className="new-item-form">
            <label className="form-labels">Name:</label>
            <input className="form-inputs" type="text"
            id="patient"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            /><br/>
            <label className="form-labels">Position:</label>
            <input className="form-inputs" type="text"
            id="position"
            value={user.position}
            readOnly={true}
            /><br/>
            <label className="form-labels">Contact Number:</label><br></br>
            <input className="form-inputs" type="text"
            id="contact-number"
            value={contactNumber}
            onChange={(e)=>{setContactNumber(e.target.value)}}/><br/>
            
            <label className="form-labels">Username:</label>
            <input className="form-inputs" type="text"
            id="username"
            value={username}
            onChange={(e)=>{setUserName(e.target.value)}}/><br/>

            <label className="form-labels">Password:</label>
            <Button id="togglePass" variant="warning" onMouseDown={()=>{
            document.getElementById("password").hidden = false;
            }} onMouseUp={()=>{
            document.getElementById("password").hidden = true;
            }}>Show</Button>
            <input className="form-inputs" type="text"
            id="password"
            value={user.password}
            readOnly = {true}
            hidden={true}
            /><br/>

            <label className="form-labels">Start Date:</label>
            <input className="form-inputs" type="text"
            id="start-date"
            value={user.startDate}
            readOnly={true}
            /><br/>

            
                <Button variant="primary" onClick={HandleSubmit} type="button">
                  Edit Record
                </Button>
              </form>
            ) : (
              <>
                <h4>User Record Edited</h4>
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
export default EditUserForm;