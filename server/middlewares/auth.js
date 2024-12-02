const jwt = require('jsonwebtoken');

const requireSignIn = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

module.exports = requireSignIn