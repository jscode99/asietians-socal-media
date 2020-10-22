const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema.Types


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    // default:"no photo"
    required: true,
  },
  //for likes
  likes: [{ type: ObjectId, ref: "User" }],
  //for comments
  // comments: [{
  //   text: String,
  //   postedBy:{type:ObjectId,ref:"User"}
  // }],
  postedBy: {
    type: ObjectId,
    //to populate the postedBy object
    ref: "User",
  },
});

mongoose.model("Post", postSchema);