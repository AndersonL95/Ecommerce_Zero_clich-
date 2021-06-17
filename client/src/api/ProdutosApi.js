import React, { useState} from 'react'



function ProdutosApi() {
    const [produtos, setProdutos] = useState([])

    
    return {
        produtos: [produtos, setProdutos]
    }

}
export default ProdutosApi