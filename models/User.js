const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
        
    },
    cargo: {
        type: Number,
        default: 0
    },
    carrinho: {
        type: Array,
        default: []
    }
}, {
    timestamps: true

})

module.exports = mongoose.model('Users', userSchema)