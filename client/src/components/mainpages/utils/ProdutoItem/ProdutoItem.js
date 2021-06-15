import React from 'react'
import BtnRender from './BtnRender';

function ProdutoItem({produto, seAdmin}) {
    return (
        
        <div className='cartao'>
            {
                seAdmin && <input type='checkbox' checked={produto.checked}/>
            }
            
            <img src={produto.images.url} alt='' />
            <div className='caixa'>
                <h2 title={produto.titulo}>{produto.titulo}</h2>
                <span>${produto.preco}</span>
                <p>${produto.descricao}</p>
            </div>
            <div>
                <BtnRender produto={produto} />
            </div>
                
            
        </div>
    )
}
export default ProdutoItem