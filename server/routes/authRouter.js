const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const requireSignIn = require('../middlewares/auth')

router.route('/').get(requireSignIn, authController.welcome)
router.route('/login').post(authController.login)
router.route('/pre-register').post(authController.preRegister)
router.route('/register').post(authController.register)
router.route('/forgot-password').post(authController.forgotPassword)
router.route('/reset-password').post(authController.resetPassword)
router.get('/refresh-token', authController.refreshToken)

module.exports = router