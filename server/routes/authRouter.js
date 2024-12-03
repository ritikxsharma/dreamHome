const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const requireSignIn = require('../middlewares/auth')

router.route('/').get(requireSignIn, authController.welcome)
router.route('/login').post(authController.login)
router.route('/pre-register').post(authController.preRegister)
router.route('/register').post(authController.register)
router.route('/forgot-password').post(authController.forgotPassword)
router.route('/access-account').post(authController.accessAccount)
router.route('/refresh-token').get(authController.refreshToken)
router.route('/current-user').get(requireSignIn, authController.currentUser)
router.route('/profile/:username').get(authController.publicProfile)
router.route('/update-password').put(requireSignIn, authController.updatePassword)
router.route('/update-profile').put(requireSignIn, authController.updateProfile)

module.exports = router