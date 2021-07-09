import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProdutoItem from '../utils/ProdutoItem/ProdutoItem'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import Filters from './Filter'
import LoadMore from './LoadMore';

function Produtos() {
    const state = useContext(GlobalState)
    const [produtos, setProdutos] = state.produtosApi.produtos
    const [seAdmin] = state.userApi.seAdmin
    const [token] = state.token
    const [callback, setCallback] = state.produtosApi.callback
    const [circular, setCircular] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) => {
        produtos.forEach(produto => {
            if(produto._id === id) produto.checked = !produto.checked
        })
        setProdutos([...produtos])
    }

    const deleteProduto = async(id, public_id) => {
        try {
            setCircular(true)
            const destruirImg = axios.post('/api/destruir', {public_id}, {
                headers: {Authorization: token}
            })
            const deleteProduto = axios.delete(`/api/produtos/${id}`, {
                headers: {Authorization: token}
            })

            await destruirImg
            await deleteProduto
            setCircular(false)
            setCallback(!callback)
            setCircular(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () => {
        produtos.forEach(produto => {
            produto.checked = !isCheck
        })
        setProdutos([...produtos])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {
        produtos.forEach(produto => {
            if(produto.checked) deleteProduto(produto._id, produto.images.public_id)
        })
    }

    if(circular) return <div><CircularProgress /></div>
    return (
        <>
        <Filters />
        {
            seAdmin &&
            <div className='deleteAll'>
                <span>Selecionar todos</span>
                <input type='checkbox' checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Apagar todos</button>
            </div>
        }
        <div className='produtos'>
            {
                produtos.map(produto => {
                    return <ProdutoItem key={produto._id} produto={produto}
                    seAdmin={seAdmin} deleteProduto={deleteProduto} handleCheck={handleCheck}/>
                })
            }
        </div>
        <LoadMore />
        {produtos.length === 0 && <CircularProgress id='spiner'/>}
        </>
    )
}
export default Produtos