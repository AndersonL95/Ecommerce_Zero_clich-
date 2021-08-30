import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'


function HistoricoDetalhes() {
    const state = useContext(GlobalState)
    const [historico] = state.userApi.historico
    const [historicoDetalhes, setHistoricoDetalhes] = useState([])

    const params = useParams()

    useEffect(() => {
        if(params.id){
            historico.forEach(item =>{
                if(item._id === params.id) setHistoricoDetalhes(item)
            })
        }
    },[params.id, historico])
    console.log(historicoDetalhes)
    if(historicoDetalhes.length === 0) return null
    return (
        <div className='historico-page'>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Codigo Postal</th>
                        <th>COdigo nacional</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr>
                        <td>{historicoDetalhes.address.recipient_name}</td>
                        <td>{historicoDetalhes.address.line1 + " - "+ historicoDetalhes.address.city}</td>
                        <td>{historicoDetalhes.address.postal_code}</td>
                        <td>{historicoDetalhes.address.country_code}</td>
                    </tr>
                </tbody>
                
            </table>
            <table style={{margin: '30px 0px'}}>
                <thead>
                    <tr>
                        <th></th>
                        <th> Produtos</th>
                        <th> Quantidade</th>
                        <th> Preço</th>
                        <th> Tamanho</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        historicoDetalhes.carrinho.map(item => (
                            <tr key={item._id}>
                                <td><img src={item.images.url} alt=''/></td>
                                <td>{item.titulo}</td>
                                <td>{item.quantity}</td>
                                <td>R$ {item.preco * item.quantity}</td>
                                <td>{item.tamSelect}</td>
                            </tr>
                        ))
                    }                    
                </tbody>
            </table>
            
        </div>
    )
}
export default HistoricoDetalhes