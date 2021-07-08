import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {GlobalState} from '../../../../GlobalState'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


function BtnRender({produto, deleteProduto}) {
    const state = useContext(GlobalState)
    const [seAdmin] = state.userApi.seAdmin
    
    return (
        <div className='row_btn'>
            {
                seAdmin ?
                <>
                    <Button id='btn_delete'>
                        <Link id='btn_delete_link' to='#!'onClick={deleteProduto}>
                            < DeleteIcon id='btn_icon'/>
                        </Link>
                    </Button>
                    <Button id='btn_edit'>
                        <Link id='btn_buy_link' to={`/editar_produto/${produto._id}`}>
                        <EditIcon id='btn_icon'/>
                        
                        </Link>
                    </Button>
                    
                </>
                :   <>
                        <Button id='btn_buy'>
                            <Link id='btn_buy_link' to={`details/${produto._id}`}>
                                <ShoppingCartIcon id='btn_icon'/>
                                Detalhes
                            </Link>
                        </Button>
                    </>
        
            }
            
        </div>
        
    )
}
export default BtnRender