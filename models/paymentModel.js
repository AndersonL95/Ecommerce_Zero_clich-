const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    paymentID: {
        type: String,
        require: true
    },
    endereco: {
        type: Object,
        require: true
    },
    carrinho: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
})
module.exports = mongoose.model('Payments', paymentSchema)