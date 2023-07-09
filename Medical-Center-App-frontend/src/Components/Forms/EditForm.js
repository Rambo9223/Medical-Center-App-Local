import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal"
import EditPatient from '../Backend-Async-Functions/Patient/EditPatient';
import EditUser from "../Backend-Async-Functions/User/EditUser"
import * as Icon from "react-bootstrap-icons";

/* EditForm uses the same logic as AddAppointment/Patient/User with only one difference
When the user clicks edit details   
the modal opens with the details already in the 
form inputs, the user will update their details as nesseccary ,on submit function checks if user is Doctor,Admin or Patient then updates the neccessary database accordingly */

function EditForm({editItem,setEditItem,recievedBool,token}){

const [name,setName] = useState("");
const [address,setAddress] = useState({
    street: String(),
    city: String(),
    postcode: String(),
    country:String(),
});
const [contactNumber,setContactNumber] = useState("")
const [username,setUsername] = useState("");
const [password,setPassword] = useState("");
// boolean useStates to change modal displays
const [submitted,setSubmitted] = useState(false);
const [bool,setBool] = useState(recievedBool);

/* We use a useEffect function to 
update the item values when the user selects a 
new item to update, this means when they edit
an item the current values will be shown in the form */
useEffect(() => {
    setBool(recievedBool);
    setEditItem(editItem);
    setName(editItem.name);
    setContactNumber(editItem.contactNumber)
    setAddress(editItem.address);
    setUsername(editItem.username);
    setPassword(editItem.password);
}, [recievedBool,setEditItem,editItem])


function ToggleBool(){
    if(bool===true && submitted === true){
}
    setBool(false);
}

const HandleSubmit = () => {
    let item 
    if(editItem.position!==undefined){
        item = {
            _id:editItem._id,
            name:name,
            contactNumber:contactNumber,
            username:username,
            password:password,
            position:editItem.position,
            startDate:editItem.startDate

        }
        
        EditUser(editItem._id,item,token).then((res)=>{alert(JSON.stringify(res));})
    }else{
        item = {
            _id:editItem._id,
            name:name,
            age:editItem.age,
            gender:editItem.gender,
            contactNumber:contactNumber,
            address:{
                street:address.street,
                city:address.city,
                postcode:address.postcode,
                country:address.country,
                _id:address._id
            },
            nextAppointment:editItem.nextAppointment,
            previousAppointment:editItem.previousAppointment,
            username:username,
            password:password 
        }
       
        EditPatient(editItem._id,item,token).then((res)=>{alert(JSON.stringify(res));})
    }
    setSubmitted(true);
}

    return (
        <>
    <div className="edit-project">
    <Modal show={bool} onHide={ToggleBool}>
        <Modal.Header closeButton>
        <Modal.Title>
            Edit Details
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {(submitted===false)?<form className="edit-item-form">
            <label className="form-labels">Database ID:</label>
            <input className="form-inputs"type="text" id="user-id"
            value={editItem._id}
            readOnly={true}
            /><br/>
            <label className="form-labels">Name:</label>
            <input className="form-inputs" type="text"
            id="user-name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}/><br/>
            <label className="form-labels">Contact Number:</label>
            <input className="form-inputs" type="text"
            id="user-number"
            value={contactNumber}
            onChange={(e)=>{setContactNumber(e.target.value)}}/><br/>
            {(editItem.age)?<><label className="form-labels">Age:</label>
            <input className="form-inputs" type='text'
            id="user-age" value={editItem.age} 
            readOnly={true} /><br/></>:null}
            <label className="form-labels">Position:</label>
            <input className="form-inputs" type='text'
            id="user-position" value={(editItem.position)?editItem.position:"Patient"} 
            readOnly={true} /><br/>
            {(address)?<>
            <label className="form-labels">Address:</label><br></br>
            <label className="form-labels">Street:</label>
            <input className="form-inputs" type="text"
            id="user-address-street" value={address.street}
            onChange={(e)=>{setAddress({street:e.target.value,city:address.city,postcode:address.postcode,country:address.country})}}/><br/>
            <label className="form-labels">City:</label>
            <input className="form-inputs" type="text"
            id="user-address-city" value={address.city}
            onChange={(e)=>{setAddress({street:address.street,city:e.target.value,postcode:address.postcode,country:address.country})}}/><br/>
            <label className="form-labels">Postcode:</label>
            <input className="form-inputs" type="text"
            id="user-address-postcode" value={address.postcode}
            onChange={(e)=>{setAddress({street:address.street,city:address.city,postcode:e.target.value,country:address.country})}}/><br/>
            <label className="form-labels">Country:</label>
            <input className="form-inputs" type="text"
            id="user-address-country" value={address.country}
            onChange={(e)=>{setAddress({street:address.street,city:address.city,postcode:address.postcode,country:e.target.value})}}/><br/>
        </>:null}
            <h6 id="login-info" hidden={true}>If editing username or password remember to login with your new details</h6>
            <label className="form-labels">Username:<Icon.InfoCircle onClick={()=>{
                  document.getElementById("login-info").hidden=(!document.getElementById("login-info").hidden);
                }
                }></Icon.InfoCircle></label>
            <input className="form-inputs" type="text"
            id="username" value={username}
            onChange={(e)=>{setUsername(e.target.value)}}/><br/>
            <label className="form-labels">Password:</label>
            <input className="form-inputs" type="text"
            id="user-password" value={password}
            onChange={(e)=>{setPassword(e.target.value)}}/><br/>
            
            <Button variant="primary" onClick={()=>{HandleSubmit()}} type="button">Submit</Button>
        </form>:<><h4>Entry Updated</h4>
        <p>You can now close this window.</p></>}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={ToggleBool}>
            Close
        </Button>
        </Modal.Footer>
    </Modal>
    </div>
    </>
    )
}
export default EditForm