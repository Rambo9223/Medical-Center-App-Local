/* The FindPatient  is another async function
the user passes a filter object to query the database,
the database return the objects that match the filter criteria
The user token is passed in the headers so the backend can check 
the user has permmision to do this action. */

const FindPatient = async(token,item) => {

    const response = await fetch("/clinic/patient/find", {
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

    export default FindPatient