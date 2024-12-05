const statusCodes = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || statusCodes.INTERNAL_SERVER_ERROR
    const env = process.env.NODE_ENV || `development`
    
    if(env === 'production'){
        res.status(statusCode).json({
            message: err.message || 'Something went wrong. Please try again later.'
        })
    }else{
        res.status(statusCode).json({
            message: err.message || 'Internal Server Error',
            stack: err.stack
        })
    }
}

module.exports = {
    statusCodes,
    errorHandler
}