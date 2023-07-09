// doctor function to find Appointments, same as admin function
// however returned item will contain more information

const FindAppointmentDoctor = async(token,item) => {

   
    const response = await fetch("/clinic/appointment/doctor", {
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

    export default FindAppointmentDoctor