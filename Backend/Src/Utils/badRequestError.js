const AppError = require('./appError');

class BadRequestError extends AppError{
    constructor(invalidParams){
        // invalidParams = []

        let message = "";
        invalidParams.forEach(params => message += `${params}\n`);
        super(`the request has the following invalid parameter\n ${invalidParams}`,400)
    }
}

module.exports = BadRequestError;