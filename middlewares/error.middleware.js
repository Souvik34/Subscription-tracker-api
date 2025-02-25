/* eslint-disable no-undef */
const errorMiddleware =(err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.log(err);

        //Mongoose Bad object
        if(err.name === 'CastError')
        {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorResponse(message, 404);
        }

        //Mongoose Duplicate Key
        if(err.code === 11000)
        {
            const message = `Duplicate field value entered`;
            error = new ErrorResponse(message, 400);
        }

        //Mongoose Validation Error
        if(err.name === 'ValidationError')
        {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorResponse(message, 400);
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    }
    catch(error)
    {
        next(error);
    }
}

export default errorMiddleware;