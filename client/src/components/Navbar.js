import React, { useContext } from "react";
//importing userContext from App.js
import { userContext } from '../App';
//importing Link from react-router-dom
import {Link,useHistory} from "react-router-dom";

function Navbar() {
  //initializing useHistory
  const history=useHistory()
  //initializing useContext with userContext
  const { state, dispatch } = useContext(userContext);
  //Applying logic to not access home directly
  const renderingList = () => {
    //Checking if the state is present or not & rendering list
    if (state) {
      return [
        // <li>
        //   <Link to="/">Home</Link>
        // </li>,
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/create">Create Post</Link>
        </li>,
        <li>
          <button
            className="btn waves-effect waves-light #d32f2f red darken-2"
            onClick={() => {
              //clearing localstorage
              localStorage.clear();
              //calling userReducer with type CLEAR
              dispatch({type: "CLEAR"});
              //Redirecting user to sigin page
              history.push("/signin");
            }}
          >
            LogOut
          </button>
        </li>,
      ];
    } else {
      return [
             
           <li><Link to="/signin">Signin</Link></li>,
          <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state?"/":"/signin"} className="brand-logo left">
         Asiet SilmaCompany
        </Link>
        <ul id="nav-mobile" className="right ">
         {renderingList()}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
