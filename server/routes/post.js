const express = require("express");
//importing router for routing process
const router = express.Router();
//importing mongoose
const mongoose = require("mongoose");
//require login middleware
const requireLogin = require("../middleware/requireLogin");
const {route} = require("./auth");
//importing post model
const Post = mongoose.model("Post");

//FETCHING ALL POSTS
router.get("/allpost", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy","_id name")
    .then(posts => {
      res.json({posts: posts});
    })
    .catch(err => {
      console.log(err);
    });
});

//Create a post
router.post("/createpost", requireLogin, (req, res) => {
  const {title, body, pic} = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({error: "Please fill the fields"});
  }
  //make undefined to not getting the password visible
  req.user.password = undefined;
  //creating the post with request
  const post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then(result => {
      res.json({post: result});
    })
    .catch(err => {
      console.log(err);
    });
});

//FETCHING THE POST OF SPECIFIED USER ONLY
router.get("/mypost", requireLogin, (req, res) => {
  Post.find({postedBy: req.user._id})
    .populate("postedBy", "_id name")
    .then(mypost => {
      res.json({mypost});
    })
    .catch(err => {
      console.log(err);
    });
});

//Like for user post
router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: {likes: req.user._id},
    },
    {
      new: true,
    },
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
});

//Unlike for user post
router.put("/unlike", requireLogin, (req, res) => {
  Post.findOneAndUpdate(
    req.body.postId,
    {
      $pull: {likes: req.user._id},
    },
    {
      new: true,
    },
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
});


//For comment section
// router.put("/comment", requireLogin, (req, res) => {
//   //Creating comment variable
//   const comment = {
//     text: req.body.text,
//     postedBy:req.user._id
//   }
//   Post.findOneAndUpdate(
//     req.body.postId,
//     {
//       $push: {comments: comment},
//     },
//     {
//       new: true,
//     },
//     //populating comments to get name whose posted
//   ).populate("comments.postedBy", "_id name")
//     .populate("postedBy","_id name")
//   .exec((err, result) => {
//     if (err) {
//       return res.status(422).json({error: err});
//     } else {
//       res.json(result);
//     }
//   });
// });


//deleting a post

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
  //finding the posted one using id
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
    if (err || !post) {
      return res.status(422).json({error:err})
    }
      //comparing id of posted one with requested one
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        //rmoving the post
        post.remove()
          .then(result => {
          res.json(result)
          }).catch(err => {
          console.log(err);
        })
      }
  })
})




module.exports = router;
