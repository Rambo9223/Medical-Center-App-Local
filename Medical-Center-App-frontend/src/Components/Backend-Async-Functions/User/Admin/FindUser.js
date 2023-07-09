/* The FindUser is another async function
the user passes a filter object to query the user database,
the database returns the objects that match the filter criteria
The user token is passed in the headers so the backend can check 
the user has permmision to do this action. */
const FindUsers = async(token,item) => {

    const response = await fetch("/clinic/user", {
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

    export default FindUsers