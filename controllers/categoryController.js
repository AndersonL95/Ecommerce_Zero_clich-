const Categoria = require('../models/categoryModel')
const Produtos = require('../models/productModel')


const categoryController = {
    getCategorias: async (req, res) =>{
        try {
            const categorias = await Categoria.find()
            res.json(categorias) 
        } catch (err) {
            return res.status(500).json({msg: err.message})
   
        }
    },
    createCategoria: async (req, res) => {
        try {
            const {nome} = req.body
            const categoria = await Categoria.findOne({nome})
            if(categoria)
            return res.status(400).json({mag: 'Essa categoria já existe.'})

            const newCategoria = new Categoria({nome})

            await newCategoria.save()
            res.json({mag: 'Categoria criada.'})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})

        }
    },
    deleteCategoria: async(req, res) => {
        try {
            const produtos = await Produtos.findOne({categoria: req.params.id})
            if(produtos) return res.status(400).json({
                msg: "Deletar todos os produtos  relacionados."
            })
          await Categoria.findByIdAndDelete(req.params.id)
          res.json({msg: "Categoria excluida."})  
        } catch (err) {
            return res.status(500).json({msg: err.message})

        }
    },
    updateCategoria: async (req, res) => {
        try {
            const {nome} = req.body
            await Categoria.findByIdAndUpdate({_id: req.params.id}, {nome})
            res.json({msg: 'Categoria modificada.'})
        } catch (err) {
            return res.status(500).json({msg: err.message})

        }
    }
}
module.exports = categoryController