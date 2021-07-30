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
        type: Object,
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

    },
    tamanho: {
        type: Array,
        default: []
    },
    sCepOrigem:{
      type: String,
      required: true  
    },
    nVlPeso:{
        type: String,
        required: true
    },
    nCdFormato:{
        type: Number,
        default: 0
    },
    nVlComprimento:{
        type: Number,
        default:0
    },
    nVlAltura:{
        type: Number,
        default: 0
    },
    nVlLargura:{
        type: Number,
        default: 0
    },
    nVlDiamentro: {
        type: Number,
        default: 0
    },
    
}, {
    timestamps: true
})
module.exports = mongoose.model("Produtos", productSchema)