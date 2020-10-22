const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../keys");

module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  if (!authorization) {
    return res.status(401).json({error: "You must be logged In"});
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({error: "You must be logged In"});
    }
    const {_id} = payload;
    User.findById(_id).then(userdata => {
      req.user = userdata;
       next();
    });
  });
};
