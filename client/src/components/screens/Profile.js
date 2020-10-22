import React, { useEffect, useState, useContext } from "react";
//importing userContext from App.js
import {userContext} from '../../App'

function Profile() {
  const [mypics, setMypics] = useState([]);
  //initializing useContext with userContext
  const { state, dispatch } = useContext(userContext);
  //using useEffect hook
  useEffect(() => {
    fetch("/mypost", {
      headers: {
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res => res.json())
      .then(result => {
        // console.log(result.mypost);
      setMypics(result.mypost)
    })
  }, [])
  return (
    <div style={{maxWidth:"550px",margin:"0px auto"}} >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{width: "160px", height: "160px", borderRadius: "80px"}}
            src="https://images.unsplash.com/photo-1552985247-03b1fddb53d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="Profile"
          />
        </div>

        <div>
          <h5>{state?state.name:"Loading....."}</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>40 Posts</h6>
            <h6>40 Followers</h6>
            <h6>40 Following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {
          mypics.map(item => {
            return (
              <img
                style={{padding:"10px"}}
                key={item._id}
                className="item"
                src={item.photo}
                alt={item.title}
              />
            );
          })
      }
      </div>
    </div>
  );
}

export default Profile;
