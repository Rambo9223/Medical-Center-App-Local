// user My Details Info for home page

/* once user has logged in this function takes the user token 
and passes it to the backend to retrieve the particular users details
which is the response.json */
const UserInfo = async (token) => {
    const response = await fetch('/home',{
        data:{},
        headers:{
            token:token,
            "Content-Type": "application/json",
        },
    })
    if (!response.ok) {
    return(`Error -${response.status}. Data coud not be fetched!`)
    } else {
    return response.json()
    }
}
export default UserInfo