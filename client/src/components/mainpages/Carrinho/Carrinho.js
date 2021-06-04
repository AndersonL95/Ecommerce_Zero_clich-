import React, {useContext, useEffect, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
import PaypalButton from './PaypalButton'


function Carrinho() {
    const state = useContext(GlobalState)
    const [carrinho, setCarrinho] = state.userApi.carrinho
    const [total, setTotal] = useState(0)
    const [token] = state.token

    useEffect(() => {
        const getTotal = () => {
            const total = carrinho.reduce((prev, item) => {
                return prev + (item.preco * item.quantity)
            },0)
            setTotal(total)
        }
        getTotal()
    }, [carrinho])
    const addToCarrinho = async () => {
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
        addToCarrinho()
    }
    const decremente = (id) => {
        carrinho.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCarrinho([...carrinho])
        addToCarrinho()
    }

    const removeProduto = id => {
        if(window.confirm("Você quer excluir esse produto?")){
            carrinho.forEach((item, index) => {
                if(item._id === id) {
                    carrinho.splice(index, 1)
                }
            })
            setCarrinho([...carrinho])
        }
    }
    const tranSuccess = async(payment) => {
        console.log(payment)
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
                                <div className='delete' onClick={() => removeProduto(produto._id)}> X </div>
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