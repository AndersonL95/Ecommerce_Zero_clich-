import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProdutoItem from '../utils/ProdutoItem/ProdutoItem'
import Slider from '../Slider/Slider'
import AwesomeSliderStyles from'react-awesome-slider/dist/styles.css?raw'
import { StylesProvider } from '@material-ui/styles'



function Produtos() {
    const state = useContext(GlobalState)
    const [produtos] = state.produtosApi.produtos
    const [seAdmin] = state.userApi.seAdmin
    
    return (
        <div className='slider'>
            <Slider className={produtos.Slider}/>
        <div className='produtos'>

            {
                produtos.map(produto => {
                    return <ProdutoItem key={produto.id} produto={produto}
                    seAdmin={seAdmin} />
                })
            }
        </div>
        </div>
    )
}
export default Produtos