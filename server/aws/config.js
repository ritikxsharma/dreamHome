const aws = require('aws-sdk')

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'ap-south-1',
    apiVersion: "2010-12-01"
}

const AWS_SES = new aws.SES(awsConfig)

module.exports = AWS_SES