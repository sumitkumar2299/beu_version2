const User = require("../Schema/userSchema");
async function findUser(parmaters){
    try{
        const response = await User.findOne({...parmaters});
        return response;
    }catch(error){
        console.log(error);
    }
}

async function createUser(userDetails){
    try{
        const response = await User.create(userDetails);
        return response;
    }catch(error){
        console.log(error)
    }
}


module.exports = {
    findUser,
    createUser
}