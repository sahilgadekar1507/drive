const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [3, "User must be atleast 3 characters long"]
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [10, "Email must be atleast 10 characters long"]
    },
    password:{
        type: String,
        required: true,
        trim: true, 
        minlength: [5, "Email must be atleast 5 characters long"]
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;