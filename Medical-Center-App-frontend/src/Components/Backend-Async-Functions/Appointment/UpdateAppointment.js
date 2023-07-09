/* Function used to update an appointment 
using PUT method the appointment is found with the id then 
the item containing the updated content is passed to the db */
const UpdateAppointment = async(id,item,token) =>{

    const response = await fetch(`/clinic/appointment/${id}/update`,{
        method: "PUT",
        headers: {
            token:token,
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
export default UpdateAppointment