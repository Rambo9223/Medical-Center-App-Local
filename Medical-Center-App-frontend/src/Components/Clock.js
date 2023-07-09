/* The Clock function is rendered in the nav bar and is only 
for asthstetic purpose 
It uses the date constructor along with hooks and a setInterval 
function to update the time displayed to the user */
import { useState,useEffect } from "react";
export default function Clock(){
    let date = new Date();
    let today = date.toDateString();
    const [time,setTime] = useState();

    useEffect(() => {
        const interval = setInterval(() => {  
        setTime(date.toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    
    },)

    return <>{`${today}   ${time}`}</>
}