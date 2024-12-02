const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const env = process.env.NODE_ENV || `development`

    if(env === 'production'){
        res.status(statusCode).json({
            message: 'Something went wrong. Please try again later.'
        })
    }else{
        res.status(statusCode).json({
            error: err.message || 'Internal Server Error',
            stack: err.stack
        })
    }
}

module.exports = errorHandler