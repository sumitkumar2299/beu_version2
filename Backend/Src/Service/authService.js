const {findUser} = require("../Repository/userRepository");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_EXPIRY} = require('../Config/ServerConfig');

async function loginUser(authDetails){
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    // check if there is a registered user with the given email id or not 

    const user = await findUser({ email})

    if(!user){
        throw{message:"No user found with the given email",statusCode:404}
    }


    // if the user is found we need to compare plaincomingpassword with hashed passwords 

    const isPasswordValidated = await bcrypt.compare(plainPassword,user.password);

    if(!isPasswordValidated){
        throw{message:"invalid password, please try again ", statusCode:401};
    }

    const userRole = user.role?user.role:"USER"

    // if the password is validated, create a token and return it 

    const token = jwt.sign({email:user.email,id:user.id,role:userRole},JWT_SECRET,{
        expiresIn:JWT_EXPIRY
    });
    return token;
}

module.exports = {
    loginUser
}