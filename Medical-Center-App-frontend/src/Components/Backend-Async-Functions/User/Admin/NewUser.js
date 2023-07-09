/* The NewUser function.
 The item is the new patient object, item is 
added to the db using POST method, token is passed in the headers */
const NewUser = async(token,item) => {

     
     const response = await fetch("/clinic/user/new", {
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

    export default NewUser
