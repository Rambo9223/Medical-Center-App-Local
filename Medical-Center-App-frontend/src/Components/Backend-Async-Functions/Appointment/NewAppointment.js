// creating a new appointment admin use only 
/* The item is the new appointment object, item is 
added to the db using POST method, token is passed in the headers  */

const NewAppointment = async(token,item) => {

     const response = await fetch("/clinic/appointment/new", {
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

    export default NewAppointment