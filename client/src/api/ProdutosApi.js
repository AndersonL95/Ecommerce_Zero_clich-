import React, { useState, useEffect } from 'react'
import axios from 'axios'


function ProdutosApi() {
    const [produtos, setProdutos] = useState([])

    const getProdutos = async () => {
        const res = await axios.get('/api/produtos')
        setProdutos(res.data.produtos)
    }

    useEffect(() =>{
        getProdutos()
    }, [])
    return {
        produtos: [produtos, setProdutos]
    }

}
export default ProdutosApi