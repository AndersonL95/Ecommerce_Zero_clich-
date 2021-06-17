const Produtos = require('../models/productModel');


class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString
    }
    filtering(){
        const queryObj = {...this.queryString}
        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)


        this.query.find(JSON.parse(queryStr))

        return this
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createAt')
        }
        return this
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page -1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}

const productController = {
    getProdutos: async(req, res) => {
        try {
            const features = new APIfeatures(Produtos.find(), req.query)
            .filtering().sorting().paginating()

            const produtos = await features.query
            res.json({
                status: 'sucesso',
                result: produtos.length,
                produtos: produtos
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
            
        }
    },
    createProduto: async(req, res) => {
        try {
            const {produto_id, titulo, preco, descricao, conteudo, images, categoria} = req.body
            if(!images) 
                return res.status(400).json({msg: 'Adicione uma imagem.'})

            const produto = await Produtos.findOne({produto_id})
            if(produto)
                return res.status(400).json({msg: 'O produto já existe.'})

            const newProduto = new Produtos({
                produto_id, titulo: titulo.toLowerCase(), preco, descricao, conteudo, images, categoria
            })
            await newProduto.save()
            res.json({msg: 'Produto criado.'})
        } catch (err) {
            return res.status(500).json({err: err.message})
            
        }
    },
    deleteProduto: async(req, res) => {
        try {
            await Produtos.findByIdAndDelete(req.params.id)
            return res.json({msg: 'Produto deletado.'})
        } catch (err) {

            return res.status(500).json({err: err.message})
            
        }
    },
    updateProduto: async(req, res) => {
        try {
            const {produto_id, titulo, preco, descricao, conteudo, images, categoria} = req.body
            if(!images) 
                return res.status(400).json({msg: 'Adicione uma imagem.'})
            await Produtos.findByIdAndUpdate({_id: req.params.id}, {
                titulo: titulo.toLowerCase(), preco, descricao, conteudo, images, categoria
            })
            res.json({msg: 'Produto alterado.'})
        } catch (err) {
            return res.status(500).json({err: err.message})
            
        }
    },
    
}
module.exports = productController