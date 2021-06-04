import React, {useState} from 'react'
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [usuario, setUsuario] = useState({
        email: '', senha: ''
    })

    const onChange = e =>{
        const {name, value} = e.target
        setUsuario({...usuario, [name]: value})
    }
    const submitHandle = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login',{...usuario})
            localStorage.setItem('primeiroLogin', true)
            window.location.href = '/'
        } catch (err) {
            alert(err.response.data.msg)
            
        }
    }


    return (
        <div className='login'>
            <form onSubmit={submitHandle}>
                <h2>Login</h2>
                <input type='email' name='email' required placeholder='email' value={usuario.email} onChange={onChange}/>
                <input type='senha' name='senha' required placeholder='senha' value={usuario.senha} onChange={onChange}/>
                <div className='row'>
                    <Button type='submit'>Login</Button>
                    <Link to='/registro'>Registro</Link>
                </div>
            </form>
        </div>
    )
}
export default Login