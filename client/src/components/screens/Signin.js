import React, { useState, useContext } from "react";
//Importing userContext from App.js
import { userContext } from '../../App'
//importing routing dom
import { Link, useHistory } from "react-router-dom";
//Materialize library
import M from "materialize-css";


function Signin() {

  //initializing useContext hook with userContext

  const { state, dispatch } = useContext(userContext);
  
  //initializing the useHistory

  let history = useHistory();

  //useState hook for state changes

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //postData function for button on click

  const postData = () => {
    //checking if email is valid or not
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      //toast the invalid message
      M.toast({
        html: "Invalid Email or Password !!!",
        classes: "#c62828 red darken-3",
      });
      return;
    }

    //fetching the data from signup fields

    fetch("/signin", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
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

        if (data.Error) {
          M.toast({
            html: data.Error,
            classes: "#c62828 red darken-3",
          });
        }
        //else sucesss fire localStorage && dipatch of useContext && Toast message
        else {
          //Saving token to localstorage of user
          localStorage.setItem("jwt", data.token)
          //Saving user details to localstorage
          localStorage.setItem("user", JSON.stringify(data.user))
          //Firing dispatch method of useContext
          dispatch({ type: "USER", payload: data.user })
          //Toast message of sucess
          M.toast({
            html: "Signedin Sucessfully",
            classes: "#388e3c green darken-2",
          });
          //then using history lib, redirect the user to signin page
          history.push("/");
        }
      })
      //catch error to console
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2 className="brand-logo">Asiet SilmaCompany</h2>
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
            Signin
          </button>
          <p>
            Create an account ?{" "}
            <Link className="already" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
