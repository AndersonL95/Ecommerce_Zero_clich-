import React, {createContext, useState} from 'react'
import ProdutosApi from './api/ProdutosApi'

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    const state = {
        token: [token, setToken],
        ProdutosApi: ProdutosApi()
    }
    ProdutosApi()

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}