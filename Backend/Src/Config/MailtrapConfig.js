const dotenv = require('dotenv');

dotenv.config();

// here we are exporting all the env variable that project uses 

module.exports={
    MAILTRAP_API_TOKEN : process.env.MAILTRAP_API_TOKEN,
    MAILTRAP_SENDER_EMAIL: process.env.MAILTRAP_SENDER_EMAIL,
    MAILTRAP_SENDER_NAME: process.env.MAILTRAP_SENDER_NAME,
    MAILTRAP_BASE_URL: process.env.MAILTRAP_BASE_URL,
}