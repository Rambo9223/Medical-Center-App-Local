/* admin function to find patients
The item posted in the body is the filter used to query the appointment 
database. The token is passed in the headers */

const FindPatientAdmin = async(token,item) => {

    const response = await fetch("/clinic/patient/findAdmin", {
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

    export default FindPatientAdmin