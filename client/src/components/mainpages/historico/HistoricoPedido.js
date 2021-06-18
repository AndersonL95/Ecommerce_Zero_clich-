import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'

import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';


function HistoricoPedido() {
    const state = useContext(GlobalState)
    const [historico, setHistorico] = state.userApi.historico
    const [seAdmin] = state.userApi.seAdmin
    const [token] = state.token
    

    useEffect(() => {
        if(token) {
            const getHistrico = async() => {
                if(seAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistorico(res.data)
                }else{
                    const res = await axios.get('/user/historico', {
                        headers: {Authorization: token}
                    })
                    setHistorico(res.data)
                }
                
            }
            getHistrico()
        }
    },[token, seAdmin, setHistorico])
    return (
        <div className='historico-page'>
            <h2>Historico de Pedidos</h2>

            <h4> Você possui {historico.length} pedido(s)</h4>
            
            <table>
                <thead>
                <tr>
                    <th>ID do pagamento</th>
                    <th>Data da compra</th>
                    <th></th>
                </tr>
                </thead>
                
                <tbody>
                    {
                        historico.map(items => (
                            <tr key={items._id}>
                                <td>{items.paymentID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString('pt-BR') }</td>
                                <td><Link to={`/historico/${items._id}`}><Button id='btn_view'>Detalhes</Button></Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        
    )
}
export default HistoricoPedido