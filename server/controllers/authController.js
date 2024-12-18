const jwt = require('jsonwebtoken')
const { AWS_SES } = require("../aws/config")
const emailSubjects = require('../helpers/emailSubjects')
const emailContents = require('../helpers/emailContents')
const emailTemplate = require('../helpers/emailTemplate')
const { hashPassword, comparePassword } = require('../helpers/authPassword')
const User = require('../models/User')
const nanoid = require('nanoid')
const emailValidator = require('email-validator')
const { statusCodes } = require('../middlewares/errorHandler')
const throwError = require('../helpers/throwError')

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

const welcome = (req, res) => {
    return res.json({ message: "Welcome" })
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            //return res.json({ message: "user doesnt exist" })
            throwError("User doesnt exist", statusCodes.NOT_FOUND)
        }

        if (!await comparePassword(password, user.password)) {
            //return res.json({ message: "Incorrect Password" })
            throwError("Incorrect Password", statusCodes.UNAUTHORIZED)
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
            // return res.json({ error: "Invalid email." })
            throwError("Invalid Email", statusCodes.BAD_REQUEST)
        }
        if (!password) {
            // return res.json({ error: "Password is required" })
            throwError("Please enter password", statusCodes.BAD_REQUEST)
        }
        if (password && password?.length < 6) {
            // return res.json({ error: "Password should be at least 6 characters." })
            throwError("Password should be atleast 6 characters", statusCodes.BAD_REQUEST)
        }

        const user = await User.findOne({ email })
        if (user) {
            // return res.json({ error: "Email already exists." })
            throwError("Email already exists", statusCodes.BAD_REQUEST)
        }

        const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            }
        )

        await new Promise((resolve, reject) => {
            AWS_SES.sendEmail(
                emailTemplate(email, emailSubjects.activateAccount(), emailContents.activateAccount(token), process.env.AWS_REPLY_TO),
                (err, data) => {
                    if (err) {
                        // console.log(err);
                        // return res.json({ ok: false })
                        reject(err)
                    } else {
                        resolve(data)
                    }
                }
            )
        })

        res.json({ message: 'email sent' })

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
            // return res.json({ error: "Email already exists." })
            throwError("Email already exists", statusCodes.BAD_REQUEST)
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
            // return res.json({ message: "No user with this email" })
            throwError("User doesnt exist", statusCodes.NOT_FOUND)
        }

        const resetCode = nanoid.nanoid()
        user.resetCode = resetCode
        user.save()

        const token = jwt.sign({ resetCode }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        AWS_SES.sendEmail(emailTemplate(email, emailSubjects.forgotPassword(), emailContents.forgotPassword(token), process.env.AWS_REPLY_TO), 
            (err, data) => {
                if (err) {
                    // console.log(err);
                    // return res.json({ ok: false })
                    throwError("Email not sent")
                } else {
                    console.log(data);
                    return res.json({ message: 'Email sent' })
                }
            }
        )

    } catch (error) {
        next(error)
    }
}

const accessAccount = async(req, res, next) => {
    try {
        const { resetCode } = jwt.verify(req.body.resetCode, process.env.JWT_SECRET)
        const user = await User.findOneAndUpdate({ resetCode }, { resetCode: "" })

        tokenAndUserResponse(req, res, user)

    } catch (error) {
        next(error)
    }
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

const currentUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        user.password = undefined
        user.resetCode = undefined
        res.json(user)
    } catch (error) {
        next(error)
    }
}

const publicProfile = async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        if(!user){
            throwError("User not found", statusCodes.NOT_FOUND)
        }
        user.password = undefined
        user.resetCode = undefined
        return res.json({ user })
    } catch (error) {
        next(error)
    }
}

const updatePassword = async(req, res, next) => {
    try {
        const { password } = req.body

        if (!password) {
            // return res.json({ error: "Password is required" })
            throwError("Please enter password", statusCodes.BAD_REQUEST)
        }
        if (password && password?.length < 6) {
            // return res.json({ error: "Password should be at least 6 characters." })
            throwError("Password should be atleast 6 characters", statusCodes.BAD_REQUEST)
        }
        const user = await User.findByIdAndUpdate(req.user._id, {
            password: await hashPassword(password)
        })

        res.json({ message: "Success" })
    } catch (error) {
        next(error)
    }
}

const updateProfile = async(req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true
        })

        user.password = undefined
        user.resetCode = undefined

        res.json({ user })
    } catch (error) {
        if(error.codeName === "Duplicate Key"){
            error.statusCode = 401
            error.message = "Username or email already taken"
        }
        next(error)
    }
}

module.exports = {
    welcome,
    login,
    preRegister,
    register,
    forgotPassword,
    accessAccount,
    refreshToken,
    currentUser,
    publicProfile,
    updatePassword,
    updateProfile
}