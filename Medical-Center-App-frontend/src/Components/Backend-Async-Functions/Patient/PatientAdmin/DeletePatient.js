/* The Delete patient function is another async function
that when user selects an patient account to delete, the item id
is passed to the function & user token to the headers,
item is deleted from the database
using DELETE method. */

const DeletePatient = async(id,token) => {
    const response = await fetch(`/clinic/patient/${id}/delete`,{
    
    method: "DELETE",
    headers:{
        token:token,
        "Content-Type": "application/json",
    }
    })
    if (response.status !== 200) {
        return (`Error - ${response.status}.${response.text()}!`);
    }else {
    return response.text();
    }
}


export default DeletePatient

