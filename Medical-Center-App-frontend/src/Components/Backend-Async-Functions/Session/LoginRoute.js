/* this function logs in an existing user */
const LoginUser = async (username,password,account) => {
  // path is the variable to store the path to the server function
  let path 
  // if account is user
  if(account==="User")
  {path="/login/user"}// user path
  else{path = "/login/patient"} // else patient path
  // create user object
    const user = {
        username:username,
        password:password
    }
    const response = await fetch(path,{
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    if (response.status!==200) {
    // if login failed show error message
    return(response.json())
    } else {
    // else return the user token
    return response.json()
    }
}
export default LoginUser