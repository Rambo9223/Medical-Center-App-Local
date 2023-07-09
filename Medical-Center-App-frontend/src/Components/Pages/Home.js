// page that displays user info and allows edit of user info

// import react hooks
import { useState,useEffect } from "react";
// import components and async functions
import EditForm from "../Forms/EditForm";
import UserInfo from "../Backend-Async-Functions/Session/UserInfo";
// import images and bootstrap components
import logo2 from "../Images/2.png";
import logo3 from "../Images/3.png";
import { Button } from "react-bootstrap";


const Home = (props) => {
  // when user logs in the token is passed to props
  let token = props.token;
  
  // useStates for our variables
  const [user,setUser] = useState(null);
  const [editUser,setEditUser] = useState();
  const [bool,setBool] = useState(false);
  
  // Within the useEffect Hook we retrieve the logged in users information
  useEffect(() => {
    const interval = setInterval(() => { 
      UserInfo(token)
    .then((res) => {
        setUser(res)
    })
    .catch((e) => {
        console.log(e.message)
    })
      }, 1000);
      return () => clearInterval(interval);
  
},)
  // show password will toggle the html to make the passwords hidden attribute false 
  const ShowPassword = () => {
    let password = document.getElementById("password");
      password.hidden=false
    document.getElementById("togglePass").innerHTML = "Hide"
  }
  // hide password will do the opposite
  const HidePassword = () => {
    let password = document.getElementById("password");
    password.hidden=true;
    document.getElementById("togglePass").innerHTML = "Show"
  }

  /* if user clicks an edit button, Edit function 
is called, the par list item is passed to the 
function & below useStates are changed */
function Edit(item){
  setBool(true); 
  setEditUser(item);
}
    
    return <>
    {(token&&user)?
    <>
    {/*If the user is logged in we can return the user info to the below card */}
    <h1>My Details</h1>
    <div className="card"> 
            <div /*className="col-lg-6 col-md-4 col-sm-6 mb-3 pt-5"*/  key={user.id}>
            <div className="card h-100">
            <div className="card-body">
            {(user.position)?<><img src={logo3} alt="header-logo" height={"150px"} width={"150px"} /></>:<><img src={logo2} alt="header-logo" height={"150px"} width={"150px"}/></>}
            <br></br>
            <h4 className='title'>Name:<br/>{user.name}</h4>
            </div>
            <ul className="list-group list-group-flush">
            
            {(user.position)?<>
            <li className="list-group-item">
                <strong>Position:</strong>{user.position}
                </li></>:null}
                {(user.contactNumber)?<>
            <li className="list-group-item">
                <strong>Contact Number:</strong>{user.contactNumber}
                </li></>:null}
              {(user.address)?
                <li className="list-group-item">
                <strong>Address:</strong>{<>
                  {user.address.street},{user.address.city},{user.address.postcode}</>}
                </li>:null}
                
                <li className="list-group-item">
                <strong>Username:</strong>{user.username}
                </li>
                <li className="list-group-item">
                <strong>Password:</strong><Button id="togglePass" variant="warning" onMouseDown={ShowPassword} onMouseUp={HidePassword}>Show</Button><p id="password" hidden={true}>{user.password}</p>
                </li>
            </ul>
            
            </div>
            <div>
            <Button variant='warning' onClick={()=>{Edit(user)}}>Edit Details</Button>{' '}
        </div>
        </div>
    {/*If the edit button is pressed the edit form is shown*/}    
    {(bool===true)?<EditForm editItem={editUser} setEditItem={setEditUser} recievedBool={bool} token={token}/>:null}  
    </div>
    </>
    :<>
    {null}
    </>}
    </>
  };
  
  export default Home;