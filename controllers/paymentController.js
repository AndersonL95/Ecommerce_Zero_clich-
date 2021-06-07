const Payments = require('../models/paymentModel')
const Users = require('../models/User')
const Produtos = require('../models/productModel')

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
            const user = await Users.findById(req.user.id).select('nome email')
            if(!user) return res.status(400).json({msg: 'Usuario não existe.'})

            const {carrinho, paymentID, address} = req.body
            const {_id, nome, email} = user

            const newPayment = new Payments({
                user_id: _id, nome, email, carrinho, paymentID, address
            })
            carrinho.filter(item => {
                return vendido(item._id, item.quantity, item.vendido)
            })
            await newPayment.save()
            res.json({msg: 'Pagamento realizado'})
        } catch (error) {
            return res.status(500).json({msg: err.message})

        }
    }
}
const vendido = async (id, quantity, vendidoOld) => {
    await Produtos.findOneAndUpdate({_id: id}, {
        vendido: quantity + vendidoOld
    })
}
module.exports = paymentController