import React, {useState, useEffect, useContext} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

const Tamanho = (produto) => {

    const params = useParams()
    const state = useContext(GlobalState)
    const [produtos] = state.produtosApi.produtos
    const [detalhesProdutos, setDetalhesProdutos] = useState([])


    useEffect(() => {
        if(params.id){
            produtos.forEach(produto => {
                if(produto._id === params.id) setDetalhesProdutos(produto)
            })
        }
    }, [params.id, detalhesProdutos])

    return (
        <div className='tamanhos'>
            <select>
                <option value=''>Tamanhos</option>
                <option value='grande'>G</option>
                <option value='medio'>M</option>
                <option value='pequeno'>P</option>

            </select>
                    
                </div>
        
    )
}

export default Tamanho
