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
//importing user model
const User=mongoose.model("User")


//router for finding user profile

router.get('/user/:id', requireLogin, (req, res) => {
    //finding user with id giving
    User.findOne({ _id: req.params._id })
        //Make password not to visible in frontend
        .select("-password")
        .then(user => {
            //finding post with id
            Post.find({ postedBy: req.params._id })
                .populate("postedBy", "_id name")
                .exec((err, posts) => {
                if (err) {
                    return res.status(422).json({error:err})
                }
                    //sending user and posts
                    res.json({user,posts})
            })
        }).catch(error => {
        return res.status(404).json({error:"User not found !!"})
    })
})








module.exports = router;
