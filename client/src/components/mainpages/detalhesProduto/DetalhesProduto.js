import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function DetalhesProduto() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [produtos] = state.ProdutosApi.produtos
    const [detalhesProdutos, setDetalhesProdutos] = useState([])

    useEffect(() => {
        if(params){
            produtos.forEach(produto => {
                if(produto._id === params.id) setDetalhesProdutos(produto)
            })
        }
    }, [params, detalhesProdutos])
    if(detalhesProdutos.length === 0) return null

    return (
        <>
        <div className='detalhe'>
            <img src={detalhesProdutos.images.url} alt=''/>
            <div className='caixa_detalhe'>
                <div className='row'>
                <h2>{detalhesProdutos.titulo}</h2>
                <h6>#id: {detalhesProdutos.produto_id}</h6>
            </div>
            <span>R$ {detalhesProdutos.preco}</span> 
            <p>{detalhesProdutos.descricao}</p>
            <p>{detalhesProdutos.conteudo}</p>
            <p>Vendido: {detalhesProdutos.vendido}</p>
            <Link to='/cart' className='cart'> Comprar</Link>
        </div>
        </div>
        <div>

        </div>
        </>
    )
}
export default DetalhesProduto