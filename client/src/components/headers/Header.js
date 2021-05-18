import React, {useState, useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icons/menu.svg'
import Close from './icons/close.svg'
import Cart from './icons/cart.svg'
import User from './icons/user.svg'
import {Link} from 'react-router-dom'
import Zero from './icons/ZeroClichê.png'
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';




function Header() {
    const value = useContext(GlobalState)
    return (
        <header>
            <div className='menu'>
                <img src={Menu} alt='' width='30' />
            </div>
            <div className='logo'>
                <h1>
                    <Link to='/'><img src={Zero} alt='ZeroClichê' width='150' className='zero'/></Link>
                </h1>
            </div>
            <ul>
                <li><Link to='/'><StorefrontIcon id='produtos-icon'/></Link></li>
                <li><Link to='/login'><PersonIcon id='btn_user'/></Link></li>
                <li><img src={Close} alt='' width='30' className='menu'/></li>
            </ul>
            <div className='cart-icon'>
                <span>0</span>
                <Link to='/cart'>
                    <ShoppingCartIcon className='cart_icon2'/>
                </Link>
            </div>
        </header>
    )
}
export default Header