const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/edu");

const authSchema = mongoose.Schema({
    username: String,
    email:String,        
    password: String,
    role: { type: String, default: 'employer' }
});

module.exports = mongoose.model("authentication", authSchema);
