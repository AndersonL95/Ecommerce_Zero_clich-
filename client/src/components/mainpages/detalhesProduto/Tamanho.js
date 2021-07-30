import React, {useState, useEffect, useContext} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import {RadioGroup, Radio} from 'react-radio-group'

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
            <form>
                <label className=''>
                    <input type='radio' name='size'/>
                    <span className=''>P</span>
                </label>
                <label className=''>
                    <input type='radio' name='size'/>
                    <span className=''>M</span>
                </label>
                <label className=''>
                    <input type='radio' name='size'/>
                    <span className=''>G</span>
                </label>
            </form>
            
                    
        </div>
        
    )
}

export default Tamanho
