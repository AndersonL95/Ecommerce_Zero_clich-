import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function ProdutoItem({produto}) {
    return (
        <div className='cartao'>
            <img src={produto.images.url} alt='' />
            <div className='caixa'>
                <h2 title={produto.titulo}>{produto.titulo}</h2>
                <span>${produto.preco}</span>
                <p>${produto.descricao}</p>
            </div>
            <Button id='btn_buy'>
                <Link id='btn_buy_link' to={`details/${produto._id}`}>
                <ShoppingCartIcon id='btn_icon'/>
                Detalhes
                </Link>
            </Button>
                
            
        </div>
    )
}
export default ProdutoItem