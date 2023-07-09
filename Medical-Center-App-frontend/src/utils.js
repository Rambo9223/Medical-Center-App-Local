import axios from "axios";
/*Base function to test if the server returns the correct data using the 
supplied base url */

// change to url for local host
export const BASE_URL = "http://localhost:5000/home";


export const fetchData = async (token) => {

    

    let respsonse = (await axios.get(`${BASE_URL}`,{
        data:{},
        headers:{
            token:token,
            "Content-Type": "application/json",
        }},));// if success return object
        return respsonse.data
};