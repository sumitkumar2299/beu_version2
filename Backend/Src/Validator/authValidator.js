const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Config/ServerConfig");
const unauthorisedError = require("../utils/unauthorisedError");


async function isLoggedIn(req, res, next) {
  const token = req.cookies["authToken"];
  if (!token) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not authenticated",
      message: "No auth token is provided",
    });
  }

  try{
    const decoded = jwt.verify(token,JWT_SECRET);
    if(!decoded){
      throw new unauthorisedError();
    }

    // if reached here, then user is authenticated allow them to acces the api 

    
      req.user = {
        email:decoded.email,
        id:decoded.id,
        role:decoded.role
      }
      next();
    }catch(error){
      return res.status(401).json({
        success:false,
        data:{},
        error:error,
        message:"invalid token provided"
      })
    }
  }
    


  // this function checks if the authenticated user is an admin or not? because we will
  // call isAdmin after isLoggedIn that's why we will recieve the user details 


  function isAdmin(req,res,next){
    const loggedInUser = req.user;
    console.log(loggedInUser);
    if(loggedInUser.role === "ADMIN"){
      console.log("User is an admin");
      next();
    }else{
      return res.status(401).json({
        success:false,
        data:{},
        message:"you are not authorised for this action",
        error:{
          statusCode:401,
          reason:"Unauthorised user for this action"
        }
      })
    }
  }


  module.exports = {
    isLoggedIn,
    isAdmin
  }
