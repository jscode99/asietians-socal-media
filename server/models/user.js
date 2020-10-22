const mongoose = require('mongoose');


//creating schema for users
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
})

//exporting mongoose model
mongoose.model("User", userSchema);