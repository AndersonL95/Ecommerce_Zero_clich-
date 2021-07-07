const router = require('express').Router()
const {calcularPrecoPrazo} = require('correios-brasil')
const auth = require('../utils/auth')
const authAdmin = require('../utils/authAdmin')
router.post('/frete', auth, authAdmin, (req, res) =>{

    const values = {
        sCepOrigem,
        sCepDestino,
        nVlPeso,
        nCdFormato,
        nVlComprimento,
        nVlAltura,
        nVlLargura,
        nCdServico,
        nVlDiamentro,
    } = req.body 
    
    calcularPrecoPrazo(values)
    .then((response) =>{
        res.send(response)
    console.log(response)
    })
})
module.exports = router