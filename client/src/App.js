import React,{useEffect,createContext,useReducer,useContext} from "react";
import "./App.css";
//Importing navbar
import Navbar from "./components/Navbar";
//importing route library
import {BrowserRouter, Route, useHistory,Switch} from "react-router-dom";
//importing home page component
import Home from "./components/screens/Home";
//importing Profile page component
import Profile from "./components/screens/Profile";
//importing login component
import Signin from "./components/screens/Signin";
//importing Signup component
import Signup from "./components/screens/Signup";
//importing createPost components
import CreatePost from "./components/screens/CreatePost";
//importing user profile
import UserProfile from './components/screens/UserProfile'
//importing reducer from /Reducer/userReducer
import {reducer,initialState} from './Reducer/userReducer'

//initializing createContext to userContext
export const userContext = createContext();

//Creating routing variable to avoid the usage of useHistory in App comp.
const Routing = () => {
  //initializing the useHistory
  const history = useHistory();
  //initializing the useContext hook with userContext
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    //Parsing user data in LS, string to object 
    const user = JSON.parse(localStorage.getItem("user"));
    //Checking Dispatch method
    dispatch({ type: "USER", payload: user });
    //Checking & redirecting user
    if (!user) {
      history.push("/sigin")
    } 
  }, [])

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
    </Switch>
  );
}



function App() {
  //initializing useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <userContext.Provider value={{state:state,dispatch:dispatch}} >
      <BrowserRouter>
        <Navbar />
        < Routing/>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
