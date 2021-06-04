import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProdutoItem from '../utils/ProdutoItem/ProdutoItem'

function Produtos() {
    const state = useContext(GlobalState)
    const [produtos] = state.produtosApi.produtos
    const [seAdmin] = state.userApi.seAdmin
    
    return (
        <div className='produtos'>
            {
                produtos.map(produto => {
                    return <ProdutoItem key={produto.id} produto={produto}
                    seAdmin={seAdmin} />
                })
            }
        </div>
    )
}
export default Produtos