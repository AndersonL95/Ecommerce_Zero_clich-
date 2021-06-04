import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'
import ProdutosApi from './api/ProdutosApi'
import UserApi from './api/UserApi'

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)

    const refreshToken = async () =>{
        const res = await axios.get('/user/refresh_token')
        setToken(res.data.accesstoken)
    }
    useEffect(() =>{
        const primeiroLogin = localStorage.getItem('primeiroLogin')
        if(primeiroLogin) refreshToken()
    }, [])
    const state = {
        token: [token, setToken],
        produtosApi: ProdutosApi(),
        userApi: UserApi(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}