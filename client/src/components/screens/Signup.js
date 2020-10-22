import React, { useState } from "react";
//for routing puropose
import { Link, useHistory } from "react-router-dom";
//Materialize library
import M from "materialize-css";

function Signup() {

  //initializing the useHistory

  let history = useHistory();

  //useState hook for state changes

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //postData function for button on click
  
  const postData = () => {
    //checking if email is valid or not
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      //toast the invalid message
       M.toast({
         html: "Invalid Email",
         classes: "#c62828 red darken-3",
       });
      return
    }

    //fetching the data from signup fields

    fetch("/signup", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    })
      //Converting the fetched data to json object

      .then(res => res.json())

      //After fetching the data chaining then

      .then(data => {
        console.log(data);

        //if backend provide us error,toast error message

        if (data.Message) {
          M.toast({
            html: data.Message,
            classes: "#c62828 red darken-3",
          });
        }
        //else toast sucess message
        else {
          M.toast({
            html: data.message,
            classes: "#388e3c green darken-2",
          });
          //then using history lib, redirect the user to signin page
          history.push("/signin");
        }
      })
      //catch error to console
      .catch(err => {
        console.log(err);
      })
  };


  return (
    <div>
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2 className="brand-logo">Asiet SilmaCompany</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className="btn waves-effect waves-light #42a5f5 blue darken-1"
            onClick={() => postData()}
          >
            Signup
          </button>
          <p>
            Already have an account ?{" "}
            <Link className="already" to="/signin">
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
