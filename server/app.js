const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGOURL, PORT } = require('./keys');



// password cloud ====== m6ZALW9lPO5y0dWe 

//=====Database connection starts===
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Database connected sucessfully');
});
mongoose.connection.on('error', (err) => {
    console.log(`Something error occured ${err}`);
});
//====Database connection ends====

//To parse the request
app.use(express.json());


//Importing user schema
require('./models/user')
//importing post schema
require('./models/post')

//importing routers from routes/auth
app.use(require('./routes/auth')); 
//importing routers from routes/post
app.use(require('./routes/post'));
//importing routers from routes/user
app.use(require('./routes/user'));

//localhost port listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
