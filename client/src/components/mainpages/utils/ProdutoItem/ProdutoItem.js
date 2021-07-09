import React from 'react'
import BtnRender from './BtnRender';

function ProdutoItem({produto, seAdmin, deleteProduto, handleCheck}) {
    return (
        
        <div className='cartao'>
            {
                seAdmin && <input type='checkbox' checked={produto.checked} onChange={() => handleCheck(produto._id)}/>
            }
            
            <img src={produto.images.url} alt='' />
            <div className='caixa'>
                <h2 title={produto.titulo}>{produto.titulo}</h2>
                <span>R$ {produto.preco}</span>
                <p>{produto.descricao}</p>
            </div>
            <div>
                <BtnRender produto={produto} deleteProduto={deleteProduto} />
            </div>
                
            
        </div>
    )
}
export default ProdutoItem