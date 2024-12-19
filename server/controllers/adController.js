const { nanoid } = require('nanoid')
const { AWS_S3 } = require('../aws/config')

const uploadImage = async (req, res) => {
    try {
        const { image } = req.body

        const base64Image = new Buffer.from(
            image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        )
        const type = image.split(";")[0].split("/")[1]

        const params = {
            Bucket: 'dreamhome-images-bucket',
            Key: `${nanoid()}.${type}`,
            Body: base64Image,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `image/${type}`
        }

        new Promise((resolve, reject) => {
            AWS_S3.upload(params, (err, data) => {
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
        .then((data) => {
            res.send({ message: "Upload successful", data: data })
        }, (error) => {
            next(error)
        })
    } catch (error) {
        next(error)
    }
}

const removeImage = async(req, res) => {
    try {
        const { Key, Bucket } = req.body

        AWS_S3.deleteObject({Bucket, Key}, (err, data) => {
            if(err){
                console.log(err);
                next(err)
            }else{
                res.send({ message: "Deleted successfully" })
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    uploadImage,
    removeImage
}