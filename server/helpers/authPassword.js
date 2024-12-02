const bcrypt = require('bcrypt')

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err){
                reject(err)
            }

            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if(err){
                    reject(err)
                }
                resolve(hashedPassword)
            })
        })
    })
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}