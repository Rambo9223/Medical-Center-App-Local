/* The EditUser function is another async function
that when user selects an item to edit, the item id & newly edited parameters
are passed to the function, the item fetched with await, 
and the new object is passed in the body with a PUT request.
The user token is passed in the headers so the backend can check 
the user has permmision to do this action. */

const EditUser = async(id,item,token) =>{

    const response = await fetch(`/clinic/user/${id}/update`,{
        method: "PUT",
        headers: {
            token:token,
            "Content-Type":"application/json"
        },
        body: JSON.stringify(item)
        });
        // if put fails 
        if (response.status !==200 ){ 
            return response.text()
        } 
        // else successful edit
        else {
            return response.json();
        }
    }
export default EditUser