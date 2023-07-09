/* this function is a put function that updates the 
appointment archived value to true, then adds it to the 
patient record if a record exists */
const ArchiveAppointment = async(id,item,token) =>{
    const response = await fetch(`/clinic/appointment/${id}/archive`,{
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
export default ArchiveAppointment