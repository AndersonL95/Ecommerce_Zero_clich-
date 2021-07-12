const router = require('express').Router()
const Correios = require('node-correios')

const correios = new Correios()

router.post('/frete',(req, res) =>{

    const {
        nCdServico,
        sCepOrigem,
        sCepDestino,
        nVlPeso,
        nCdFormato,
        nVlComprimento,
        nVlAltura,
        nVlLargura,
        nVlDiamentro,
    } = req.body
    
    correios.calcPrecoPrazo({
        nCdServico,
        sCepOrigem,
        sCepDestino,
        nVlPeso,
        nCdFormato,
        nVlComprimento,
        nVlAltura,
        nVlLargura,
        nVlDiamentro,
    }).then(values => {
        res.json(values)
        console.log(values)
    }).catch(error => {
        return res.json(error)
    })
})
module.exports = router