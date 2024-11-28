require('dotenv').config();
const mongoose = require('mongoose');
const mongo_url =  process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("Connected to databases");
}).catch(e=>console.log(mongo_url))