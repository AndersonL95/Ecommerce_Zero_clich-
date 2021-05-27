import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Produtos from './produtos/Produtos'
import Login from './auth/Login'
import Registro from './auth/Registro'
import DetalhesProduto from './detalhesProduto/DetalhesProduto'
import Cart from './cart/Cart'
import NotFound from './utils/NotFound/NotFound'
import Frete from './Correios/frete'

function Pages() {
    return (
        
            <Switch>
                <Route path='/' exact component={Produtos} />
                <Route path='/details/:id' exact component={DetalhesProduto} />
                <Route path='/login' exact component={Login} />
                <Route path='/registro' exact component={Registro} />
                <Route path='/cart' exact component={Cart} />
                <Route path='/frete' exact component={Frete} />

                
                <Route path='*' exact component={NotFound} />
            </Switch>
    
    )
}
export default Pages