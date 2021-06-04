const Payments = require('../models/productModel')
const Users = require('../models/User')
const Produto = require('../models/productModel')

const paymentController = {
    getPayments: async(req, res) => {
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        try {
            const user = await (await Users.findById(req.user.id)).isSelected('nome email')
            if(!user) return res.status(400).json({msg: 'Usuario não existe.'})

            const {carrinho, paymentID, endereco} = req.body
            const {_id, nome, email} = user

            const newPayment = new Payments({
                user_id: _id, nome, email, carrinho, paymentID, endereco
            })
            res.json({newPayment})
        } catch (error) {
            return res.status(500).json({msg: err.message})

        }
    }
}

module.exports = paymentController