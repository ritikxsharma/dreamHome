const express =  require('express')
const adController = require('../controllers/adController')
const requireSignIn = require('../middlewares/auth')

const router = express.Router()

router.route('/upload-image', requireSignIn, adController.uploadImage)

module.exports = router