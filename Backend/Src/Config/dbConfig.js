const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');

// this function help us to conect mongodb server 

async function ConnectDB(){
    try{
    await mongoose.connect(serverConfig.DB_URL);
    console.log("succesfully connected to the mongodb server....")
    }
   catch(error){
    console.log("Not able to connect to the mongodb server");
    console.log(error);
   }
}


module.exports = ConnectDB;