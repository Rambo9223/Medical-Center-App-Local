import DeleteUser from "../Backend-Async-Functions/User/Admin/DeleteUser";
import EditUserForm from "../Forms/EditUserForm";
import FindUsers from "../Backend-Async-Functions/User/Admin/FindUser";
import AddUser from "../Forms/AddUser";
import { useState,useRef,useEffect } from "react";
import logo3 from "../Images/3.png";
import { Search } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button"

/* The UserSearch page utilises the same logic and structure as the 
PatientSearch page, However this page can only be accessed by admins
they can do all crud operations with the users section of the database*/

const UserSearch = (props) => {
    
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    const searchRef = useRef();
    let token = props.token;

    const HideSearch = () => {
    let result = (document.getElementById("filters").value)
    let text = searchRef.current;
    if(result==="{}"||result==="Doctor"||result==="Admin"){
      text.hidden = true;
    }
    else{
      text.hidden = false;
    }
    }

    const HandleFilter = () =>{
      let filter ="";
      let filterQuery = document.getElementById("filters").value;
      let filterFilter = document.getElementById("form1").value;
      if(filterQuery==="name"){
        filter = {query:filterQuery,filter:filterFilter}
      }else if(filterQuery==="Doctor"||filterQuery==="Admin"){
        filter = {query:"position",filter:filterQuery}
      }
      else if (filterQuery==="{}"){
        filter = {}
      }    
      setFilter(filter);
    }
    
    useEffect(() => {
        const interval = setInterval(() => {
            if(filter!==""){
                FindUsers(token,filter)
              .then((res) => {
                  setUsers(res)
              })
              .catch((e) => {
                  console.log(e.message)
              });
            }
          }, 1000);
          return () => clearInterval(interval);
    },)


  return (<>
  <h1>Users</h1>
  <div className="add-new-container">
  <AddUser token={token}/>
  </div>
  <h2>Find Users</h2>
  <div className="search-queries">
  <select onChange={HideSearch} className="form-select-md" id="filters" aria-label="Default select example">
  <option defaultValue={""}>Filter by:</option>
  <option value={"{}"}>All</option>
  <option value="name">Name</option>
  <option value="Doctor">Doctors</option>
  <option value="Admin">Admin</option>
</select> 
  <div className="input-group">
  <div className="form-outline">
  <input ref={searchRef} type="search" id="form1" className="form-control" placeholder="Search"/>
  </div>
</div>
<Button onClick={()=>{HandleFilter()}} type="button" className="btn btn-primary">
  Search <Search/>
</Button>
<br></br>
</div>
  
{(users.length>0)?(users.map((user)=>{

return (

<>
<div className="card" key={user._id}>
<div>
<img src={logo3} height={"200px"} width={"200px"}  alt="logo"/>
</div>
<div className="card-body">
<ul className="list-group list-group-flush" key={user._id}>
<li className="list-group-item"><strong>Name:</strong>{user.name}</li>
<li className="list-group-item"><strong>Position:</strong>{user.position}</li>
<li className="list-group-item"><strong>Contact Number:</strong>{user.contactNumber}</li>
<li className="list-group-item"><strong>Username:</strong>{user.username}</li>
<li className="list-group-item"><strong>StartDate:</strong>{user.startDate}</li>

</ul>
</div>
<div className="action-container">
<EditUserForm token={token} user={user} />
<Button variant="danger" id="delete-patient" onClick={()=>{DeleteUser(user._id,token).then((res)=>{
    alert(res)
})}}>Delete User</Button>

</div>
</div>
<br/>
</>
)})):null}
  </>)
  }
export default UserSearch