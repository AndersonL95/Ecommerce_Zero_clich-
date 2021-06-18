import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProdutoItem from '../utils/ProdutoItem/ProdutoItem'
import Slider from '../Slider/Slider'
import axios from 'axios'


function Produtos() {
    const state = useContext(GlobalState)
    const [produtos, setProdutos] = state.produtosApi.produtos
    const [seAdmin] = state.userApi.seAdmin

    

    useEffect(() =>{
        const getProdutos = async () => {
            const res = await axios.get('/api/produtos')
            setProdutos(res.data.produtos)
        }
        getProdutos()
    }, [setProdutos])
    
    return (
        <div className='slider'>
            <Slider className={produtos.Slider}/>
        <div className='produtos'>

            {
                produtos.map(produto => {
                    return <ProdutoItem key={produto._id} produto={produto}
                    seAdmin={seAdmin} />
                })
            }
        </div>
        </div>
    )
}
export default Produtos