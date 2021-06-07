import React, {useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icons/menu.svg'
import Close from './icons/close.svg'
import {Link} from 'react-router-dom'
import Zero from './icons/ZeroClichê.png'
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [seLogado] = state.userApi.seLogado
    const [seAdmin] = state.userApi.seAdmin
    const [carrinho] = state.userApi.carrinho

    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.clear()
        window.location.href = '/'
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to='/criar_produto'className='cProduto'> + Produto</Link></li>
                <li><Link to='/categoria' className='categoria'> categoria</Link></li>

            
            </>
        )
    }
    const logadoRouter = () =>{
        return(
            <>
                <li ><Link to='/historico' className='historia'> historico</Link></li>
                <li ><Link to='/' onClick={logoutUser} className='sair'>Sair</Link></li>

            
            </>
        )
    }
    return (
        <header>
            <div className='menu'>
                <img src={Menu} alt='' width='30' />
            </div>
            <div className='logo'>
                <h1>
                    <Link to='/'>{seAdmin ? <img src={Zero} alt='ZeroClichê' width='150' className='zero'/> : <img src={Zero} alt='ZeroClichê' width='150' className='zero'/>}</Link>
                </h1>
            </div>
            <ul>
                <li><Link to='/'>{seAdmin ? <StorefrontIcon id='produtos-icon'/> :<StorefrontIcon id='produtos-icon'/>}</Link></li>
                {seAdmin && adminRouter()}
                {
                    seLogado ? logadoRouter() : <li><Link to='/login'><PersonIcon id='btn_user'/></Link></li>
                }
                
                <li><img src={Close} alt='' width='30' className='menu'/></li>
            </ul>
            {
                seAdmin ? ''
                :<div className='cart-icon'>
                <span>{carrinho.length}</span>
                <Link to='/carrinho'>
                    <ShoppingCartIcon className='cart_icon2'/>
                </Link>
            </div>
            }
            
        </header>
    )
}
export default Header