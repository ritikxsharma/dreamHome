const { AWS_S3 } = require('../aws/config')

const uploadImage = async(req, res) => {
    try {
        console.log(req.body);
        
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = { 
    uploadImage
}