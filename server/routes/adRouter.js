const express =  require('express')
const adController = require('../controllers/adController')
const requireSignIn = require('../middlewares/auth')

const router = express.Router()

router.route('/upload-image').post(requireSignIn, adController.uploadImage)
router.route('/remove-image').post(requireSignIn, adController.removeImage)

module.exports = router