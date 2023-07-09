import { Outlet, Link } from "react-router-dom";
/* The layout component is is the display of nav bar links that each type of 
user gets to see, the user is passed as props and the links shown if the user is a 
patient - Home & Appointments 
Doctor - Home & Appoinments & Patients
Admin - Home & Appointments & Patients & Users */
const Layout = (props) => {
    let user = props.user;
    let Links;
    if(user==="Doctor"){
        Links = (
            <>
              <nav className="route-container">
                <ul className="nav-routes">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/patients">Patients</Link>
                  </li>
                  <li>
                    <Link to="/appointments">Appointments</Link>
                  </li>
                </ul>
              </nav>
              <Outlet />
            </>
          )
    }
    else if(user==="Admin"){
        Links = (
            <>
              <nav className="route-container">
                <ul className="nav-routes">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="patients">Patients</Link>
                  </li>
                  <li>
                    <Link to="appointments">Appointments</Link>
                  </li>
                  <li>
                    <Link to="users">Users</Link>
                  </li>
                </ul>
              </nav>
              <Outlet />
            </>
          )
    }
    else if(user==="Patient"){
        Links = (<>
              <nav className="route-container">
                <ul className="nav-routes">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/appointments">Appointments</Link>
                  </li>
                </ul>
              </nav>
              <Outlet />
            </>)
    }
    return Links
  
};

export default Layout;