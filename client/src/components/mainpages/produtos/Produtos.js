import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProdutoItem from '../utils/ProdutoItem/ProdutoItem'

function Produtos() {
    const state = useContext(GlobalState)
    const [produtos] = state.ProdutosApi.produtos
    
    return (
        <div className='produtos'>
            {
                produtos.map(produto => {
                    return <ProdutoItem key={produto.id} produto={produto} />
                })
            }
        </div>
    )
}
export default Produtos