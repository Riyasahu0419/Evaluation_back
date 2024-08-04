// const mongoose=require("mongoose")
// const connection= mongoose.connect("mongodb://localhost:27017/guest")
// module.exports=connection


const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connection = mongoose.connect(process.env.MONGODB_URI)

module.exports = connection