const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    produto_id:{
        type: String,
        unique: true,
        trim: true,
        required: true

    },
    titulo:{
        type: String,
        trim: true,
        required: true

    },
    preco:{
        type: Number,
        trim: true,
        required: true

    },
    descricao:{
        type: String,
        required: true

    },
    conteudo:{
        type: String,
        required: true

    },
    images:{
        type: String,
        required: true

    },
    categoria:{
        type: String,
        required: true

    },
    checked:{
        type: Boolean,
        default: false

    },
    vendido:{
        type: Number,
        default: 0

    }


})
module.exports = mongoose.model("Produtos", productSchema)