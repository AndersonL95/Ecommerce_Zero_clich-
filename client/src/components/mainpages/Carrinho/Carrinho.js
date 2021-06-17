import React, {useContext, useEffect, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


function Carrinho() {
    const state = useContext(GlobalState)
    const [carrinho, setCarrinho] = state.userApi.carrinho
    const [token] = state.token
    const [total, setTotal] = useState(0)


    useEffect(() => {
        const getTotal = () => {
            const total = carrinho.reduce((prev, item) => {
                return prev + (item.preco * item.quantity)
            },0)
            setTotal(total)
        }
        getTotal()
    }, [carrinho])
    const addToCarrinho = async (carrinho) => {
        await axios.patch('/user/addCarrinho', {carrinho}, {
            headers: {Authorization: token}
        })
    }

    const incremente = (id) => {
        carrinho.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })
        setCarrinho([...carrinho])
        addToCarrinho(carrinho)
    }
    const decremente = (id) => {
        carrinho.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCarrinho([...carrinho])
        addToCarrinho(carrinho)
    }

    const removeProduto = id => {
        if(window.confirm("Você quer excluir esse produto?")){
            carrinho.forEach((item, index) => {
                if(item._id === id) {
                    carrinho.splice(index, 1)
                }
            })
            setCarrinho([...carrinho])
            addToCarrinho(carrinho)
        }
    }
    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment

        await axios.post('/api/payment', {carrinho, paymentID, address}, {
            headers: {Authorization: token}
        })
        setCarrinho([])
        addToCarrinho([])
        alert('Pedido realizado com sucesso.')
    }

    if(carrinho.length === 0)
        return <h2 style={{textAlign: 'center', fontSize: '5rem'}}>Carrinho vazio</h2>
    return (
        <div>
            {
                carrinho.map(produto => (
                    <div className='detalhe carrinho' key={produto._id}>
                        <img src={produto.images.url} alt='' className='img_container'/>
                        <div className='caixa_detalhe'>
                            <h2>{produto.titulo}</h2>

                                <h3>R$ {produto.preco * produto.quantity}</h3> 
                                <p>{produto.descricao}</p>
                                <p>{produto.conteudo}</p>
                                <div className='amount'>
                                    <button onClick={() => decremente(produto._id)}> - </button>
                                    <span>{produto.quantity}</span>
                                    <button onClick={() => incremente(produto._id)}> + </button>
                                </div>
                                <div className='delete' onClick={() => removeProduto(produto._id)}> <DeleteForeverIcon /> </div>
                        </div>
                    </div>
                ))
            }
            <div className='total'>
                <h3>Total: R$ {total}</h3>
                <PaypalButton
                    total={total}
                    tranSuccess={tranSuccess} />
            </div>
        </div>
    )
}
export default Carrinho