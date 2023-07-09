/* admin function to find Appointments 
The item posted in the body is the filter used to query the appointment 
database. */

const FindAppointmentAdmin = async(token,item) => {

    const response = await fetch("/clinic/appointment/admin", {
        method: "POST",
        headers: {
          "token":token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      
      if (response.status !== 200) {
        return (`Error ${response.status}!`);
      } else {
        return response.json();
      }
    };

    export default FindAppointmentAdmin