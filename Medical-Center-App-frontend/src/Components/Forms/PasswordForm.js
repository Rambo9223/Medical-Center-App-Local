// import backend server function to reset password
import ResetPassword from "../Backend-Async-Functions/Session/ResetPassword";
// import bootstap components
import {Modal,Button} from "react-bootstrap";

function PasswordForm(props){

    let pass = props.pass; // boolean to open modal
    let TogglePass = props.TogglePass;// function to change boolean 
    let resetPassword = props.resetPassword;// boolean to change modal display
    let setResetPassword = props.setResetPassword;//function to toggle this boolean

    // useRefs to hold new values
    let userRef = props.userRef
    let passRef = props.passRef;
    let confirmPassRef = props.confirmPassRef;

    function HandlePasswordReset(){
      // when reset button is clicked
        if(userRef&&passRef&&confirmPassRef){
          // if all useRefs arent ""
            // create new object 
            let item = {
                username:userRef.current.value,
                newPassword:passRef.current.value,
                confirmPassword:confirmPassRef.current.value
            }
            // pass this object to server
            ResetPassword(item).then((res)=>{
          
            if(res===String()){// if error
                alert(res);// alert error
            }else{// if success
                setResetPassword(true);// change modal display
                }
            })
        }else{// if any form fields are blank
            alert("Please fill in all form fields");
        }
    }
    return(
        <>
        <div className="Login-Form">
<Modal show={pass} onHide={TogglePass}>
    <Modal.Header closeButton>
    <Modal.Title>
    Reset Password
    </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {(resetPassword===false)?
    <>
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
        <label>New Password</label>
        <input
          type="password"
          className="form-control mt-1"
         ref={passRef}
         placeholder="Enter new password"
        />
      </div>
      <div className="form-group mt-3">
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control mt-1"
         ref={confirmPassRef}
         placeholder="Re-enter new password"
        />
      </div>
    </div>
  </form>
</div>
<br/>
    <Button variant="primary" onClick={()=>{HandlePasswordReset()}} type="button">Reset</Button>
    </>:(<><h4>Successfully Reset Password</h4>
    <p>You can now close this window.</p></>)}
    </Modal.Body>
    <Modal.Footer>
    <Button variant="primary" onClick={TogglePass}>
        Close
    </Button>
    </Modal.Footer>
</Modal>
</div>
        </>
    )
}
export default PasswordForm