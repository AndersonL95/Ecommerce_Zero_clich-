import React, {useState, useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icons/menu.svg'
import Close from './icons/close.svg'
import Cart from './icons/cart.svg'
import User from './icons/user.svg'
import {Link} from 'react-router-dom'
import Zero from './icons/ZeroClichê.png'



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
                <li><Link to='/'>Produtos</Link></li>
                <li><Link to='/login'><img src={User} alt='login' width='25' /></Link></li>
                <li><img src={Close} alt='' width='30' className='menu'/></li>
            </ul>
            <div className='cart-icon'>
                <span>0</span>
                <Link to='/cart'>
                    <img src={Cart} alt='' width='30' />
                </Link>
            </div>
        </header>
    )
}
export default Header