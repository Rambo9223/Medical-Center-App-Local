// import react hooks 
import React,{ useState,useRef,useEffect } from "react";
// media query for responsiveness
import { useMediaQuery } from 'react-responsive'
// bootstrap components
import {Modal,Button} from "react-bootstrap";
// async functions to server/db
import LoginUser from "../Backend-Async-Functions/Session/LoginRoute";
// layout for nav bar links
import Layout from "../Pages/Layout";
// password form for reset password functionality
import PasswordForm from "../Forms/PasswordForm";


// initial is an object containing the modal text 
// for the sign in portion of the modal
const initial = {
    title:"Patient Login",
    account:"Clinic Staff login -",
}
/* Use this function to let user login*/
function Login(){
    // the username displayed on welcome message
    const [user,setUser] = useState();
    // the authenticated user token 
    const [auth,setAuth] = useState();
    // bool used to toggle modal
    const [bool,setBool] = useState(false);
    const [pass,setPass] = useState(false);
    // form headings shown on modal
    const [formHeadings,setFormHeadings] = useState(initial);
    // submitted is boolean variable used to toggle submitted display of modal
    const [submitted,setSubmitted] = useState(false);
    const [resetPassword, setResetPassword] = useState(false)
    // useRefs to hold the username and password values
    const userRef = useRef(); 
    const passRef = useRef();
    const confirmPassRef = useRef();


    // ToggleBool changes bool and resets
    // form display by changin submitted to false
    function ToggleBool(){
        setBool(!bool);
        if(bool===true&&submitted===true){
        setSubmitted(false);
        // trigger page reload to access local storage in nav page
        window.location.reload();
        }
    }
    // opens/closes the reset password modal
    function TogglePass(){
        setBool(!bool);
        setPass(!pass);
        setResetPassword(false)
    }
    // toggleheadings alters the modal text, 
    // so user is either logging in or registering a new account
    function ToggleHeadings(){
        if(formHeadings === initial){
            setFormHeadings({title:"Staff Login",account:"Clinic Patients login - "})
        }else{setFormHeadings(initial)}
    }
    // used to change display of logout/login button depending on device being used to view the app
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
        })
        const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    
    // Handle submit is called when user logs in
    function HandleSubmit(){
        // username and password are the useRef user input values from the form
        const username = userRef.current.value;
        const password = passRef.current.value;
        let account 
        // as long as both aren't empty strings 
        if(username && password){
        // setUser to username
        if(formHeadings.title === "Patient Login"){
            account = "Patient"
        }else{account="User"}
            // login user
            LoginUser(username,password,account).then((res)=>{
                if(!JSON.stringify(res).includes("Error")){// if response object doesn't contain Error
                setAuth(res);// set token
                
                // set type of user
                setUser(`${(res.loggedIn.position)?res.loggedIn.position:""} ${res.loggedIn.name}`);
                // set response to localStorage item user
                localStorage.setItem("user",JSON.stringify(res));
                // change modal display 
                setSubmitted(true);
                // if error, alert error
                }else{alert(JSON.stringify(res));}
                });
                
    }else{
        // if username or password is blank throw
        alert("You cannot enter a blank username or password");
    }
}
/* When user is logged in we add the login info to local storage 
so if they exit the app or refresh the session is stored until they 
log out */

useEffect(() => {
    // when page loads
    const stored = JSON.parse(localStorage.getItem("user"));  
    // if no user exists - end 
    // if user exists
    if (stored!==null) {
    // setUser and Auth to stored variables
      setUser(`${(stored.loggedIn.position)?stored.loggedIn.position:"Patient"} ${stored.loggedIn.name}`);
      setAuth(stored.token);
    }
  }, []);

    // when user logs out 
    function Logout(){
        setAuth(undefined);// no token to pass to other functions
        setUser(""); // no username
        localStorage.clear(); // clear all stored items
        // reload to clear page
        window.location.reload();
    }

    /* The Login Form */
    function Form(){
    return (
        <>
        <div className="Login-Form">
    <Modal show={bool} onHide={ToggleBool}>
        <Modal.Header closeButton>
        <Modal.Title>
            {formHeadings.title}
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {(submitted===false)?
        <>
        {formHeadings.account}  <Button variant="warning" onClick={ToggleHeadings}>Here</Button>
        <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              ref={userRef}
              placeholder="Enter email address"
             
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
             ref={passRef}
             placeholder="Enter password"
            />
          </div>
        </div>
        <h6>Forgot your -<Button variant="link" onClick={TogglePass}>Password?</Button></h6>
      </form>
    </div>
    <br/>
        <Button variant="primary" onClick={()=>{HandleSubmit()}} type="button">Login</Button>
        </>:(<><h4>Successfully Logged In</h4>
        <p>You can now close this window.</p></>)}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={ToggleBool}>
            Close
        </Button>
        </Modal.Footer>
    </Modal>
    </div>
        </>
    )}
    return (
    <div>    
    {(bool===true)?<Form/>:null/*if bool is true show form */}
    {/*If user clicks reset password, open Password Form*/}
    {(pass===true)?<PasswordForm pass={pass}
    TogglePass={TogglePass} resetPassword={resetPassword} setResetPassword={setResetPassword} userRef={userRef} passRef={passRef} confirmPassRef={confirmPassRef}/>:null}

    {(auth!==undefined)?/* is there is a user logged in ie auth = token
    display the nav bar layout for the type of user that is logged in */
    <>
    
    <h3>Welcome {user}</h3>
    <br></br>
    <div className="nav-container">
    
    {(user.includes("Doctor")?<>
    <Layout user={"Doctor"} />
    </>:null)}

    {(user.includes("Admin")?<>
        <Layout user={"Admin"} />
        </>:null)}
        
    {(!(user.includes("Admin"))&&!(user.includes("Doctor"))?<>
    <Layout user={"Patient"} />
    </>:null)}
    </div>

    {/*Media queries below alter the button based on the device used to view the app */}
    {isDesktopOrLaptop && <>
    <div id="logout-button">
    <Button  variant="info" className="rounded-pill" onClick={Logout}>Logout</Button>
    </div>
    </>}
    {isTabletOrMobile && <>
    <div id="logout-button">
    <Button  variant="primary" className="rounded-pill" onClick={Logout}>Logout</Button>
    </div>
    </>}
    
    
    </>:<>
    <h3>Login Below</h3>
    <br></br>
    {isDesktopOrLaptop && <>
    <Button id="login-button" variant="info" className="rounded-pill" onClick={ToggleBool}>Login</Button>
    </>}
    {isTabletOrMobile && <>
    <Button id="login-button" variant="primary" className="rounded-pill" onClick={ToggleBool}>Login</Button>
    </>}
    </>}
    
    </div>
    )
}
export default Login