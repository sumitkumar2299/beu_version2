const AppError = require('./appError');

class unauthorisedError extends AppError{
    constructor(){
        super("user is not authorised properly",401);
    }
}

module.exports = unauthorisedError;