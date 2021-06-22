import React from 'react'
import Zero from '../headers/icons/ZeroClichê.png'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import {Link} from 'react-router-dom'


function Footer() {
    return (
       <footer>
           <div className='footerL'>
                <ul className='footerList'>
                    <li className="zero"><img src={Zero} alt='ZeroClichê' width='150' className='zeroAdmin'/></li>
                    <li className="about"><a href=''>Quem somos nós</a></li>
                    <li className="">Marechal Deodoro - AL</li>
                </ul>
            </div>
            <div className='mediaT'>
                <ul>
                    <li><a href=''><InstagramIcon id='media'/></a></li>
                    <li><a href=''><FacebookIcon id='media' /></a></li>
                    <li><a href=''><WhatsAppIcon id='media'/></a></li>
                </ul>
                
                <p className="copyright">Zer0Clichê © 2021</p>
            </div>
       </footer>
       
    )
}

export default Footer
