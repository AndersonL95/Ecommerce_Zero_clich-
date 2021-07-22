import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'
import ProdutosApi from './api/ProdutosApi'
import UserApi from './api/UserApi'
import CategoriaApi from './api/CategoriaApi'

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)

    
    
    useEffect(() =>{
        const primeiroLogin = localStorage.getItem('primeiroLogin')
        if(primeiroLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
                setToken(res.data.accesstoken)
                setTimeout(() =>{
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    }, [])
    const state = {
        token: [token, setToken],
        produtosApi: ProdutosApi(),
        userApi: UserApi(token),
        categoriaApi: CategoriaApi(),
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}