// creating a new patient admin use only 
/* The item is the new patient object, item is 
added to the db using POST method, token is passed in the headers  */

const NewPatient = async(token,item) => {

    
    const response = await fetch("/clinic/patient/new", {
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

   export default NewPatient