const jwt = require('jsonwebtoken')
const AWS_SES = require("../aws/config")
const emailSubjects = require('../helpers/emailSubjects')
const emailContents = require('../helpers/emailContents')
const emailTemplate = require('../helpers/emailTemplate')
const { hashPassword, comparePassword } = require('../helpers/authPassword')
const User = require('../models/User')
const nanoid = require('nanoid')
const emailValidator = require('email-validator')

const tokenAndUserResponse = (req, res, user) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    user.password = undefined
    user.resetCode = undefined

    return res.json({ token, refreshToken, user })
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ message: "user doesnt exist" })
        }

        if (!await comparePassword(password, user.password)) {
            return res.json({ message: "Incorrect Password" })
        }

        tokenAndUserResponse(req, res, user)

    } catch (error) {
        next(error)
    }
}

const preRegister = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body

        if (!emailValidator.validate(email)) {
            return res.json({
                error: "Invalid email."
            })
        }
        if (!password) {
            return res.json({
                error: "Password is required"
            })
        }
        if (password && password?.length < 6) {
            return res.json({ error: "Password should be at least 6 characters." })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.json({ error: "Email already exists." })
        }

        const token = jwt.sign(
            { email, password },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )
        AWS_SES.sendEmail(
            emailTemplate(email, emailSubjects.activateAccount(), emailContents.activateAccount(token), process.env.AWS_REPLY_TO),
            (err, data) => {
                if (err) {
                    console.log(err);
                    return res.json({ ok: false })
                } else {
                    console.log(data);
                    return res.json({ ok: true })
                }
            })

    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.body.token, process.env.JWT_SECRET)
        const { email, password } = decodedToken

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.json({ error: "Email already exists." })
        }

        const hashedPassword = await hashPassword(password)
        const user = await new User({
            username: nanoid.nanoid(6),
            email,
            password: hashedPassword
        }).save()

        tokenAndUserResponse(req, res, user)

    } catch (error) {
        next(error)
    }
}

const forgotPassword = async(req, res, next) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })

        if(!user){
            return res.json({ message: "No user with this email" })
        }

        const resetCode = nanoid.nanoid()
        user.resetCode = resetCode
        user.save()

        const token = jwt.sign({ resetCode }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        AWS_SES.sendEmail(emailTemplate(email, emailSubjects.forgotPassword(), emailContents.forgotPassword(token), process.env.AWS_REPLY_TO), 
            (err, data) => {
                if(err){
                    console.log(err)
                    return res.json({ ok: false })
                }else{
                    console.log(data);
                    return res.json({ ok: true })
                }
            }
        )

    } catch (error) {
        next(error)
    }
}

const resetPassword = async(req, res, next) => {
    try {
        const { resetCode } = jwt.verify(req.body.resetCode, process.env.JWT_SECRET)
        const user = await User.findOneAndUpdate({ resetCode }, { resetCode: "" })

        tokenAndUserResponse(req, res, user)

    } catch (error) {
        next(error)
    }
}

const welcome = (req, res) => {
    return res.json({ message: "Welcome" })
}

const refreshToken = async(req, res, next) => {
    try {
        const { _id } = jwt.verify(req.headers.refresh_token, process.env.JWT_SECRET)
        const user = await User.findById(_id)

        tokenAndUserResponse(req, res, user)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    preRegister,
    register,
    forgotPassword,
    resetPassword,
    welcome,
    refreshToken
}