const router = require('express').Router()
const productController = require('../controllers/productController')
const auth = require('../utils/auth')
const authAdmin  = require('../utils/authAdmin') 

router.route('/produtos')
    .get(productController.getProdutos)
    .post(auth, authAdmin, productController.createProduto)

router.route('/produtos/:id')
    .delete(auth, authAdmin, productController.deleteProduto)
    .put(auth, authAdmin, productController.updateProduto)


module.exports = router