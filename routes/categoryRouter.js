const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const auth = require('../utils/auth')
const authAdmin = require('../utils/authAdmin')

router.route('/categoria')
.get(categoryController.getCategorias)
.post(auth, authAdmin, categoryController.createCategoria)

router.route('/categoria/:id')
    .delete(auth, authAdmin, categoryController.deleteCategoria)
    .put(auth, authAdmin, categoryController.updateCategoria)


module.exports = router