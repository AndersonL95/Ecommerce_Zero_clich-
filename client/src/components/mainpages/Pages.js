import React, { useContext } from 'react'
import {Switch, Route} from 'react-router-dom'
import Produtos from './produtos/Produtos'
import Login from './auth/Login'
import Registro from './auth/Registro'
import DetalhesProduto from './detalhesProduto/DetalhesProduto'
import Carrinho from './Carrinho/Carrinho'
import NotFound from './utils/NotFound/NotFound'
import Frete from './Correios/frete'
import HistoricoPedido from './historico/HistoricoPedido'
import HistoricoDetalhes from './historico/HistoricoDetalhes'
import Categorias from './Categorias/Categorias'
import CriarProduto from './createProdutos/CriarProdutos'


import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [seLogado] = state.userApi.seLogado
    const [seAdmin] = state.userApi.seAdmin

    return (
        
            <Switch>
                <Route path='/' exact component={Produtos} />
                <Route path='/details/:id' exact component={DetalhesProduto} />
                <Route path='/login' exact component={seLogado ? NotFound : Login} />
                <Route path='/registro' exact component={seLogado ? NotFound : Registro} />
                <Route path='/categoria' exact component={seAdmin ? Categorias : NotFound} />
                <Route path='/criar_produto' exact component={seAdmin ? CriarProduto : NotFound} />
                <Route path='/editar_produto/:id' exact component={seAdmin ? CriarProduto : NotFound} />
                <Route path='/historico' exact component={seLogado ? HistoricoPedido : NotFound}  />
                <Route path='/historico/:id' exact component={seLogado ? HistoricoDetalhes : NotFound}  />
                <Route path='/carrinho' exact component={Carrinho} />
                <Route path='/frete' exact component={Frete} />

                
                <Route path='*' exact component={NotFound} />
            </Switch>
    
    )
}
export default Pages