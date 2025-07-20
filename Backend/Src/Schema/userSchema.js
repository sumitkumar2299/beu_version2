const mongoose = require("mongoose");
// always use bcrypt in the mongoose file 

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"first name is required"],
        minLength:[5,"first name must be atleast 5 characters long"],
        lowercase:true,
        trim:true,//if user gives extra space then it will automatically remove it 
        maxLength:[20,"first name should be less than or equal to 20 charactrs"]
    },
    lastName: {
        type:String,
        required:[true,"first name is required"],
        minLength:[5,"last name must be atleast 5 characters long"],
        lowercase:true,
        trim:true,
        maxLength:[20,"last name should be less than or equal to 20 characters"]
    },
    collegeName: {
        type:String,
        required:[true,"college name is required"],
        minLength:[5,"college name must be atleast 5 characters long"],
        lowercase:true,
        maxLength:[50,"last name should be less than or equal to 50 characters"]
    },
    mobileNumber:{
        type:String,
        trim:true,
        maxLength:[10,"phone number should be of length 10"],
        minLength:[10,"phone number should be of length 10"],
        unique:[true,"phone number is already in use"],
        required:[true,"phone number should be provided"]
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Email should be provided"],
        unique:[true,"Email is already in use"],
        match:[ /^[^\s@]+@[^\s@]+\.[^\s@]+$/,"please fill a valid email address"]
    },
    password:{
        type:String,
        required:[true,"password should be provided"],
        minLength:[6,"password should be minimum of 6 character long"]
    },
    branch:{
        type:String,
        enum:["CSE","ECE","EE","ME","CE"],
        required:[true,"branch is required"]
    }, 

    role:{

        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    


},
{
    timestamps:true
})

userSchema.pre('save',async function () {
    const hashedPassword = await bcrypt.hash(this.password,10);
    this.password = hashedPassword;
})

const User = mongoose.model("user",userSchema) // collection 

module.exports = User;