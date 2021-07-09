import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filter() {
    const state = useContext(GlobalState)
    const [categorias] = state.categoriaApi.categorias
    const [categoria, setCategoria] = state.produtosApi.categoria
    const [sort, setSort] = state.produtosApi.sort
    const [search, setSearch] = state.produtosApi.search

    const handleCategoria = e => {
        setCategoria(e.target.value)
        setSearch('')
    }

    return (
        <div className='filter_menu'>
            <div className='row'>
                <span>Filters: </span>
                <select name='categoria' value={categoria} onChange={handleCategoria}>
                    <option value=''>Todos os produtos</option>
                    {
                        categorias.map(categoria => (
                            <option value={'categoria=' + categoria._id} key={categoria._id}>
                                {categoria.nome}
                            </option>
                        ))
                    }
                    
                </select>
            </div>
            <input
                type='text' 
                value={search} 
                placeholder="Pesquisar"
                onChange={e => setSearch(e.target.value.toLowerCase())} 
            />
            <div className='row'>
                <span>Ordenar por: </span>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value=''>Recente</option>
                    <option value='sort=oldest'>Antigos</option>
                    <option value='sort=-vendido'>Mais vendidos</option>
                    <option value='sort=-preco'>Preço: Alto-Baixo</option>
                    <option value='sort=preco'>Preço: Baixo-Alto</option>
                </select>
            </div>
        </div>
    )
}

export default Filter