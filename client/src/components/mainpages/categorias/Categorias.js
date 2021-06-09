import React,{useState, useContext} from 'react'
import{GlobalState} from '../../../GlobalState'
import axios from 'axios'


function Categorias(){
    const state = useContext(GlobalState)
    const [categorias] = state.categoriaApi.categorias
    const [categoria, setCategoria] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriaApi.callback
    const [onEdit, setOnEdit] =useState(false)
    const [id, setID] = useState('')

    const createCategoria = async e => {
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/categoria/${id}`, {nome: categoria}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/categoria', {nome: categoria}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategoria('')
            setCallback(!callback)
           
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const editCategoria = async (id, nome) =>{
        setID(id)
        setCategoria(nome)
        setOnEdit(true)
    }
    const deleteCategoria = async id =>{
        try {
            const res = await axios.delete(`/api/categoria/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return(
        <div className='categorias'>
                <form onSubmit={createCategoria}>
                    <label htmlFor='categoria'>Categoria</label>
                    <input type='text' name='categoria' value={categoria} required 
                        onChange={e => setCategoria(e.target.value)}/>
                    <button type='submit'>{onEdit? 'Update' : 'Salvar'}</button>
                </form>
                <div className='col'>
                    {
                        categorias.map(categoria => (
                            <div className='row' key={categoria._id}>
                                <p>{categoria.nome}</p>
                                <div>
                                    <button onClick={() => editCategoria(categoria._id, categoria.nome)}>Editar</button>
                                    <button onClick={() => deleteCategoria(categoria._id)}>Excluir</button>

                                </div>
                            </div>
                        ))
                    }
                </div>
        </div>
    )
}
export default Categorias