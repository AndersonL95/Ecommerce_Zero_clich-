const router = require('express').Router()
const {calcularPrecoPrazo} = require('correios-brasil')
router.post('/frete', (req, res) =>{

    const values = {
        sCepOrigem,
        sCepDestino,
        nVlPeso,
        nCdFormato,
        nVlComprimento,
        nVlAltura,
        nVlLargura,
        nCdServico: [],
        nVlDiamentro,
    } = req.body 
    
    calcularPrecoPrazo(values)
    .then((response) =>{
        res.send(response)
    console.log(response)
    })
})
module.exports = router