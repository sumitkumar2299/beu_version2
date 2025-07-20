const {findUser,createUser} = require('../Repository/userRepository');
const { sendMailtrapEmail, generateWelcomeEmailHTML } = require('../Middleware/mailtrapMiddleware');


async function registerUser(userDetails){
    console.log("hitting service layer")
    // it will create a brand new user in the db

    const user = await findUser({
        email:userDetails.email,
        mobileNumber:userDetails.mobileNumber
    })

    if(user){
        // we found a user
        throw{reason:'user with the given email and mobile number already exist',statusCode:400}
    }
    
    // if not then create the user in the database 

    const newUser = await createUser({
        email:userDetails.email,
        password:userDetails.password,
        firstName:userDetails.firstName,
        lastName:userDetails.lastName,
        mobileNumber:userDetails.mobileNumber,
        collegeName:userDetails.collegeName,
        branch:userDetails.branch
    })

    if(!newUser){
        throw{reason:'something went wrong,cannot create user',statusCode:500}
    }

    // Send welcome email
    try {
        await sendMailtrapEmail({
            to: newUser.email,
            subject: 'Welcome to beuHelper!',
            html: generateWelcomeEmailHTML(newUser.firstName)
        });
    } catch (emailError) {
        console.error('Failed to send welcome email:', emailError.message);
        // Optionally, you can continue without throwing, or throw if email is critical
    }

    return newUser
}


module.exports = {
    registerUser
}