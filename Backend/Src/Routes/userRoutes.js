const express = require("express");

const {createUser} = require('../Controller/userController')
// we have to initialize a router object in a new file 
// routers are used for seggerating your routes in different modules

const userRouter = express.Router();

userRouter.post('/',createUser); // this is a route registration 

module.exports = userRouter; // exporting the router