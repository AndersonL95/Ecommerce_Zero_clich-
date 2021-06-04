const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../utils/auth')

router.post('/registro', userController.registro)
router.post('/login', userController.login)
router.get('/logout', userController.logout)

router.get('/refresh_token', userController.refreshToken)
router.get('/infor', auth, userController.getUser)

router.patch('/addCarrinho', auth, userController.addCarrinho)



module.exports = router