/* The ResetPassword async function
the user passes a object with username and new password details,
if the requirements of the changePassword middleware are met the 
account details are updated  */
const ResetPassword = async(item) =>{

    const response = await fetch(`/changePassword`,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(item)
        });
        if (response.status !==200 ){ 
            return response.text()
        } 
        else {
            return response.json();
        }
    }
export default ResetPassword