const express = require("express");
//importing router for routing process
const router = express.Router();
//importing mongoose
const mongoose = require("mongoose");
//importing mongoose model from /models/user
const User = mongoose.model("User");
//importing bcrypt for password hashing
const bcrypt = require("bcryptjs");
//importing jsonwebtoken library
const jwt = require("jsonwebtoken");
//Destructuring jwt secret
const {JWT_SECRET} = require("../keys");
//Importing requireLogin
const requireLogin = require("../middleware/requireLogin");

//route & auth for signup
router.post("/signup", (req, res) => {
  const {name, email, password} = req.body;

  //Checking the fields correct or not

  if (!name || !email || !password) {
    return res.status(422).json({Error: `Please fill all the fields`});
  }

  //Checking the user already exist or not

  User.findOne({email: email})
    .then(savedUser => {
      if (savedUser) {
        return res.status(422).json({Message: "User already Exist"});
      }
      //password hashing
      bcrypt.hash(password, 12).then(hashedpassword => {
        //Creating the new user if the user not existed
        const user = new User({
          name,
          email,
          password: hashedpassword,
        });
        //to save user and his status
        user
          .save()
          .then(user => {
            res.json({message: "Account created !!"});
          })
          .catch(err => {
            res.status(422).json({message: "Something error occured" + err});
          });
      });

      //catching any error with database
    })
    .catch(err => {
      console.log(err);
    });
});

//route & auth for signin

router.post("/signin", (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(422).json({message: "Please add email or password"});
  }
  User.findOne({email: email}).then(savedUser => {
    if (!savedUser) {
      return res.status(422).json({message: "Invalid email or password"});
    }
    bcrypt
      .compare(password, savedUser.password)
      .then(doMatch => {
        if (doMatch) {
          // res.status(200).json({message:"Sucessfully SignedIn..."})
          //JWT TOKEN AUTHENTICATION
          const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
          //Destructuring the savedUser
          const {_id, name, email} = savedUser;
          res.status(200).json({token: token, user: {_id, name, email}});
        } else {
          return res.status(422).json({error: "Invalid email or password"});
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
});

//exporting routes
module.exports = router;
