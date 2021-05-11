const router = require('express').Router()
const productController = require('../controllers/productController')

router.route('/produtos')
    .get(productController.getProdutos)
    .post(productController.createProduto)

router.route('/produtos/:id')
    .delete(productController.deleteProduto)
    .put(productController.updateProduto)


module.exports = router