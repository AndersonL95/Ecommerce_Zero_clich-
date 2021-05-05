const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/registro', userController.registro)
router.get('/refresh_token', userController.refreshToken)



module.exports = router