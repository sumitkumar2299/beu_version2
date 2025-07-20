const express  = require("express");
const cookieParser = require('cookie-parser')
const userRouter = require("./Routes/userRoutes");

const serverConfig = require("./Config/ServerConfig");
const ConnectDB = require("./Config/dbConfig");

const app = express();


const authRouter = require("./Routes/authRoutes");
const {isLoggedIn} = require('./Validator/authValidator')


app.use(cookieParser());
app.use(express.json()); //Yeh middleware request body ko JSON mein parse kar deta hai.
app.use(express.text()); //Yeh middleware plain text ko parse karta hai.
app.use(express.urlencoded({extended:true})); //HTML form ke data ko parse karta hai.



app.use('/users',userRouter);
app.use('/auth',authRouter);


app.listen(serverConfig.PORT,async()=>{
    await ConnectDB();
    console.log(`server started at port ${serverConfig.PORT}...`)
})