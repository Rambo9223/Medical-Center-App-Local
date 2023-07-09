// patient function to find Appointments 
// patient can only search appointments in their own name 
// so cannot change the filter used to query the db

const FindAppointmentPatient = async(token,item) => {

    const response = await fetch("/clinic/appointment/patient", {
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

    export default FindAppointmentPatient