import React, {useState, useEffect, useContext} from "react";
import { userContext } from "../../App";
//Materialize library
import M from "materialize-css";

function Home() {
  //initializing useState
  const [data, setData] = useState([]);
  //for comment
  // const [comment, setcomment] = useState([])
  //initializing useContext with userContext
  const {state, dispatch} = useContext(userContext);
  //Performing useEffect to component mount at the page load
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        //setting result to setData state
        setData(result.posts);
      });
  }, []);

  //network request to /like

  const likePost = id => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //network request to unlike post

  const unlikePost = id => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
            // makecomment;
          }
        });
        setData(newData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //Network request for comment
  // const makecomment = (text, postId) => {
  //   fetch("/comment", {
  //     method: "put",
  //     headers: {
  //       "Content-Tpye": "appication/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       text: text,
  //       postId: postId,
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       console.log(result);
  //       // const newComment = data.map(item => {
  //       //   if (item._id === result._id) {
  //       //     return result;
  //       //   } else {
  //       //     return item;
  //       //     // makecomment;
  //       //   }
  //       // });
  //       setcomment(result);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

//network request to delete post
  
  const deletePost = postId => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        Authorization:"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.filter(item => {
          return item._id!==result._id
        })
        setData(newData)
      }).then(() => {
       M.toast({
         html: "Post Deleted !!!",
         classes: "#c62828 red darken-3",
       });
    })
  }



  return (
    <div className="home">
      {
        data.map(item => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>
              {item.postedBy.name}{" "}
              {item.postedBy._id == state._id && (
                <i
                  className="material-icons"
                  style={{float: "right", cursor: "pointer"}}
               onClick={()=>deletePost(item._id)} >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={item.photo} alt="post" />
            </div>
            <div className="card-content">
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  style={{cursor: "pointer"}}
                  onClick={() => {
                    unlikePost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  style={{cursor: "pointer"}}
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} Likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>

              {/* {comment.map(record => {
                return (
                  <h6 key={record._id}>
                    <span style={{fontWeight:"500"}} >
                      {record.postedBy.name}
                    </span>
                    {record.text}
                  </h6>
                );
              })} */}
              {/* 
              <form
                onSubmit={e => {
                  e.preventDefault();
                  makecomment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add comment" />
              </form> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
