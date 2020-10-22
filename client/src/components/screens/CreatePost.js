import React, { useState,useEffect } from "react";
//Materialize library
import M from "materialize-css";
//importing history from react-router-dom lib
import {useHistory} from 'react-router-dom';

function CreatePost() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  
  //if url changes use effect will exec coz of dependency array

  useEffect(() => {
    if (url) {
      //fetch request from our backend routes/post
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          //Using authorization method getting jwt data from localstorage
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        //Converting the fetched data to json object

        .then(res => res.json())

        //After fetching the data chaining then

        .then(data => {
          console.log(data);

          //if backend provide us error,toast error message

          if (data.error) {
            M.toast({
              html: data.error,
              classes: "#c62828 red darken-3",
            });
          }
          //else toast sucess message
          else {
            M.toast({
              html: "Posted Sucessfully",
              classes: "#388e3c green darken-2",
            });
            //then using history lib, redirect the user to signin page
            history.push("/");
          }
        })
        //catch error to console
        .catch(err => {
          console.log(err);
           M.toast({
             html:"Try again",
             classes: "#c62828 red darken-3",
           });
        });
    }
  }, [url]);

  const postDetails = () => {
    //for file upload use FormData
    const data = new FormData();
    //appending type and file-name
    data.append("file", image)
    //appending preset and preset name in cloudinary
    data.append("upload_preset", "insta-clone")
    //appending cloud name and cloud name in cloudinary
    data.append("cloud_name", "nakedwolf93")
    //fetch request using cloudinary API BASE URL
    fetch("https://api.cloudinary.com/v1_1/nakedwolf93/image/upload", {
      method:"post",
      body:data
    })
      .then(res => res.json())
      .then(data => {
      // console.log(data);
        
        //setting url using state hook

        setUrl(data.url)
      }).catch(err => {
        console.log(err);
        if (err) {
           M.toast({
             html: "Try again",
             classes: "#c62828 red darken-3",
           });
        }
      })
   
  }

  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #42a5f5 blue darken-1">
          <span>Upload Image</span>
          <input
            type="file"
            // multiple
            // value={image}
            onChange={e => setImage(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            // placeholder="Upload one or more files"
            // value={image}
            // onChange={e=>setImage(e.target.files[0])}
          />
        </div>
      </div>
      <button className="btn waves-effect waves-light #42a5f5 blue darken-1" onClick={()=>postDetails()}>
        Post
      </button>
    </div>
  );
}

export default CreatePost;
