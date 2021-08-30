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
    const [opt, setOpt] = useState()


    useEffect(() => {
        if(params.id){
            produtos.forEach(produto => {
                if(produto._id === params.id) setDetalhesProdutos(produto)
                
            })
        }
    }, [params.id, detalhesProdutos])
    
    if(detalhesProdutos.length === 0) return null
    detalhesProdutos.tamSelect = opt
    
    return (

        <>
        <div className='detalhe'>
            <p>{detalhesProdutos.tamSelect}</p>
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
                <select id='selectTam' value={opt} onChange={e => setOpt(e.target.value)} >
                    <option id='size'value=''>Tamanho</option>
                        {
                            detalhesProdutos.tamanho.map((i) =>{
                                if(i.checked === true){
                                return(
                                    <option id='size' key={detalhesProdutos.id} >{i.name}</option>
                                )
                            }})
                         }
                    </select>
                  
                    
          
                <Link to='#!' className='btn_car'  onClick={() => addCarrinho(detalhesProdutos)}> Comprar</Link>
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