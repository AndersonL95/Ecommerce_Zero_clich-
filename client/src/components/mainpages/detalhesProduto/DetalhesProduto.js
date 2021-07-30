import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProdutoItem from '../utils/ProdutoItem/ProdutoItem'
import CalcFrete from '../Correios/CalcFrete'

function DetalhesProduto(produto) {
    const params = useParams()
    const state = useContext(GlobalState)
    const [produtos] = state.produtosApi.produtos
    const [detalhesProdutos, setDetalhesProdutos] = useState([])
    const addCarrinho = state.userApi.addCarrinho


    useEffect(() => {
        if(params.id){
            produtos.forEach(produto => {
                if(produto._id === params.id) setDetalhesProdutos(produto)
            })
        }
    }, [params.id, detalhesProdutos])
    
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
                <div className='row'>
                    <select>
                        <option value=''>Tamanho</option>
                        {
                         produtos.map(produto => (
                             
                             <option >
                                 
                             </option>
                         ))

                        }
                    </select>
                        
                        
                </div>
                <Link to='#!' className='btn_car' onClick={() => addCarrinho(detalhesProdutos)}> Comprar</Link>
                <CalcFrete />
            </div>
            
        </div>
        <div>
            <h2>Produtos Relacionados</h2>
            <div className='produtos'>
                {
                    produtos.map(produto => {
                        return produto.categoria === detalhesProdutos.categoria
                            ? <ProdutoItem key={produto.id} produto={produto} /> : null
                    })
                }
            </div>
        </div>
        </>
    )
}
export default DetalhesProduto