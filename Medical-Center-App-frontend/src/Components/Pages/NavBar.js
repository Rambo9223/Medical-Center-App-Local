// import hooks, media query for responsivness && routes 
// for page navigation 
import React,{useState,useEffect} from 'react'
import { useMediaQuery } from 'react-responsive'
import { Routes, Route } from "react-router-dom";
// import image
import LogoWhite from "../Images/1.png";
// import components for navigation and forms for login
import Login from '../Forms/Login';
import Home from './Home';
import Appointments from './Appointments';
import Users from './Users';
import Patients from './Patients';
import Clock from '../Clock';

function NavBar(){
    
    const [auth,setAuth] = useState("");//user jwt token
    const [user,setUser] = useState("");// patient,doctor or admin
    const [userObj,setUserObj] = useState();// the logged in user details
    // our local storage obejct user
    let stored = JSON.parse(localStorage.getItem("user"));
        

    /* If a user loggs in the localStorage item user is set
    the useEffect will run to update the above useStates */
    useEffect(()=>{
        if (stored!==null&&user===""&&auth==="") {
            setUser(`${(stored.loggedIn.position)?stored.loggedIn.position:"Patient"}`);
            setAuth(stored.token);
            setUserObj(stored.loggedIn);
        }
    },[auth,stored,user,userObj])

    /* the two variables use the useMediaQuery hook to set the 
    width limits, thus the variable is a boolean variable*/
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

        
        
        return (
        <>
        {/*If user is on desktop or laptop we display the nav bar in full */}
        {isDesktopOrLaptop && <>
            <div className='page-header'>
            <div className='blackout-bar'>
                <div className='date-time'><Clock/></div>
                <h2>My Medicare</h2>
            </div>
            <div className='nav-container'>
            <img className='nav-images' src={LogoWhite} alt='logo-white'/>
                <nav className='nav-bar'>
                <Login/>
                </nav>
            <img className='nav-images' src={LogoWhite} alt='logo-white'/>
            </div>
        </div>
        </>}
        {/*if user is on tablet or mobile we remove one of the nav images */}
        {isTabletOrMobile && <> 
            <div className='page-header'>
            <div className='blackout-bar'>
                <div className='date-time'><Clock/></div>
                <h2>My Medicare</h2>
            </div>
            <img className='nav-images' src={LogoWhite} alt='logo-white'/>
                <nav className='nav-bar'>
                <Login/>
                </nav>
        </div>
        <div className='spacer'></div>
        </>}
        {/*We display the body which contains the routes to each of our pages*/}
        <div className='body'>
        <Routes>
        <Route path='/' element={<Home token={auth}/>} />
        <Route path="patients" element={<Patients token={auth}/>} />
        <Route path="appointments" element={<Appointments userInfo={userObj} token={auth}/>}/>
        <Route path="users" element={<Users token={auth} />} />
        </Routes> 
        <br></br>
        </div>
        </>
        )
}

export default NavBar
