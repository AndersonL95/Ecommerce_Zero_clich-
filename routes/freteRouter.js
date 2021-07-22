const router = require('express').Router()
const productController = require('../controllers/productController')

router.route('/frete')
    .post(productController.CalcFrete)

module.exports = router