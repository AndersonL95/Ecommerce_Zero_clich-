import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory, useParams} from 'react-router-dom'


const initialState = {
    produto_id: '',
    titulo: '',
    preco: 0,
    descricao: '',
    conteudo: '',
    categoria: '',
    tamanho:[],
    _id:''
}
    

const CriarProduto = () => {
    const state = useContext(GlobalState)
    const [ produto, setProduto] = useState(initialState)
    const [categorias] = state.categoriaApi.categorias
    const [seAdmin] = state.userApi.seAdmin
    const [token] = state.token
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tamanhos, setTamanhos] = useState([
        { name: 'pp',key: '1', label: '1', checked:false}, {name: 'P', key: '2', label: '2', checked:false}, 
        {name: 'M', key: '3', label: '3', checked:false}, {name: 'G', key: '4', label: '4', checked:false},
    ],)


    const history = useHistory()
    const param = useParams()

    const [produtos] = state.produtosApi.produtos
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.produtosApi.callback
    

    useEffect(() =>{
       if(param.id){
           setOnEdit(true)
         produtos.forEach(produto => {
             if(produto._id === param.id){
                setProduto(produto)
                setImages(produto.images)
             }
         })
       }else{
           setOnEdit(false)
           setProduto(initialState)
           setImages(false)
       }
    }, [param.id, produtos])

    
    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!seAdmin) 
                return alert("Você não é administrador.")
                const file = e.target.files[0]
                
                if(!file) return alert('Arquivo não existe.')
                if(file.size > 1024 *1024)
                    return alert('Arquivo muito grande!')
                if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                    return alert('Formato do arquivo invalido!')

                let formData = new FormData()
                formData.append('file', file)

                setLoading(true)
                const res = await axios.post('/api/upload', formData, {
                    headers: {'content-type': 'multipart/form-data', Authorization: token}
                })
                setLoading(false)
                setImages(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleDestroi = async () => {
        try {
            if(!seAdmin) 
                return alert("Você não é administrador.")
                setLoading(true)
            await axios.post('/api/destruir', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)                
        } catch (err) {
            alert(err.response.data.msg)
            
        }
    }
    const handleChangeInput = e => {
        const {name, value, checked} = e.target
        setProduto({...produto, [name]:value})
        //setIsCheck({...isCheck, [name]:checked })
        
    }
    const handleChange = name => {
        const newState = tamanhos.map(el => {
            const label = el

            if(el.name === name){
            label.checked = !el.checked
        }
        return label
    })
    setTamanhos(newState)
    produto.tamanho = newState
    

    }
    
    /*useEffect(() => {
        console.log("isCheck:", isCheck)
    }, [isCheck])*/

    const handleSubmit = async e => {
        e.preventDefault()
        
        try {
            if(!seAdmin) 
                return alert("Você não é administrador.")
            if(!images) 
                return alert("Selecione uma imagem.")
            if(onEdit){
                await axios.put(`/api/produtos/${produto._id}`, {...produto, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/produtos', {...produto, images}, {
                    headers: {Authorization: token}
            })
            
            }
            setCallback(!callback)
            console.log(produto)
            history.push('/')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const styleUpload ={
        display: images ? 'block' : 'none'
    }
    return (
        <div className='criar_produto'>
            <div className='upload'>
                <input type='file' name='file' id='file_up' onChange={handleUpload}/>
                {
                    loading ?  <div id='file_img'><CircularProgress id='spiner' /></div>
                    :<div id='file_img' style={styleUpload}>
                        <img src={images ? images.url : ''} alt=''/>
                        <span onClick={handleDestroi}>X</span>
                    </div>
                }
                
            </div>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <label htmlFor='produto_id'>Produto ID</label>
                    <input 
                        type='text' 
                        name='produto_id' 
                        id='produto_id' required 
                        value={produto.produto_id}
                        onChange={handleChangeInput}
                        disabled={onEdit}
                    />
                </div>
                <div className='row'>
                    <label htmlFor='titulo'>Titulo </label>
                    <input 
                        type='text' 
                        name='titulo' 
                        id='titulo' required 
                        value={produto.titulo}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className='row'>
                    <label htmlFor='preco'>Preço</label>
                    <input 
                        type='number' 
                        name='preco' 
                        id='preco' required 
                        value={produto.preco}
                        onChange={handleChangeInput}    
                    />
                </div>
               <div className='row'>
                    <label htmlFor='descricao'>Descrição</label>
                    <textarea 
                        type='text' 
                        name='descricao' 
                        id='descricao' required 
                        value={produto.descricao} rows='5'
                        onChange={handleChangeInput}
                    />
                </div>
                <div className='row'>
                    <label htmlFor='conteudo'>Conteudo</label>
                    <textarea
                        type='text' 
                        name='conteudo' 
                        id='conteudo' required 
                        value={produto.conteudo}
                        rows='7'
                        onChange={handleChangeInput}
                    />
                </div>
                <div className='tamanho'>
                    <label>Tamanho do produto : </label><br/>
                    {
                        tamanhos.map((item, index) =>(
                            <view key={index}>
                                <input
                                    type='checkbox'
                                    value={item.checked}
                                    onChange={() => handleChange(item.name)}
                                />
                                {item.name}
                            </view>
                        ))
                        /*produto.tamanho.map(item =>(
                            <label className='container' key={item.key}>
                                {item.nome}
                                <input
                                    type='checkbox' 
                                    className='campo' 
                                    value={produto.tamanho} 
                                    name={item.nome} 
                                    checked={isCheck[item.nome]} 
                                    onChange={handleChangeInput}
                                />
                            </label>
                        ))
                        */
                    }
                    
                    
                </div>
                <div className='row'>
                    <label htmlFor='Peso'>Peso em kg</label>
                    <input 
                        type='text' 
                        name='nVlPeso' 
                        id='nVlPeso' required 
                        value={produto.nVlPeso}
                        onChange={handleChangeInput}    
                    />
                </div>
                <div className='row'>
                    <label htmlFor='Formato'>Formato do pacote: 1 = pacote 2 = Rolo/Prisma 3 = Envelope</label>
                    <input 
                        type='number' 
                        name='nCdFormato' 
                        id='nCdFormato' required 
                        value={produto.nCdFormato}
                        onChange={handleChangeInput}    
                    />
                </div>
                <div className='row'>
                    <label htmlFor='Comprimento'>Comprimento da encomenda em cm</label>
                    <input 
                        type='number' 
                        name='nVlComprimento' 
                        id='nVlComprimento' required 
                        value={produto.nVlComprimento}
                        onChange={handleChangeInput}    
                    />
                </div>
                <div className='row'>
                    <label htmlFor='Altura'>Altura da encomenda</label>
                    <input 
                        type='number' 
                        name='nVlAltura' 
                        id='nVlAltura' required 
                        value={produto.nVlAltura}
                        onChange={handleChangeInput}    
                    />
                </div>
                <div className='row'>
                    <label htmlFor='Largura'>Largura da encomenda</label>
                    <input 
                        type='number' 
                        name='nVlLargura' 
                        id='nVlLargura' required 
                        value={produto.nVlLargura}
                        onChange={handleChangeInput}    
                    />
                </div>
                <div className='row'>
                    <label htmlFor='Diametro'>Diametro da encomenda</label>
                    <input 
                        type='number' 
                        name='nVlDiamentro' 
                        id='nVlDiamentro' required 
                        value={produto.nVlDiamentro}
                        onChange={handleChangeInput}    
                    />
                </div>
                <div className='row'>
                    <label htmlFor='Meu Cep'>Nosso Cep</label>
                    <input 
                        type='number' 
                        name='sCepOrigem' 
                        id='sCepOrigem' required 
                        value={produto.sCepOrigem}
                        onChange={handleChangeInput}    
                    />
                </div>
                <div className='row'>
                    <label htmlFor='categorias'>Categorias</label>
                    <select name='categoria' value={produto.categoria} onChange={handleChangeInput}>
                        <option value="">Selecione uma categoria</option>
                        {
                            categorias.map(categoria => (
                                <option value={categoria._id} key={categoria._id}>
                                    {categoria.nome}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type='submit'>{onEdit? 'Editar' : 'Adicionar'}</button>
            </form>
        </div>
    )
}

export default CriarProduto

/*<div className='tamanho'>
                    <h3>Tamanho do produto</h3>
                    <label className='container'>PP<input type='checkbox' name='PP'value={produto.tamanho} checked={isCheck} onChange={handleChangeInput}/> <span className='checkmark'></span></label>
                    <label className='container'>P <input type='checkbox' name='P'value={produto.tamanho} checked={isCheck} onChange={handleChangeInput}/> <span className='checkmark'></span></label>
                    <label className='container'>M <input type='checkbox' name='M'value={produto.tamanho} checked={isCheck} onChange={handleChangeInput}/> <span className='checkmark'></span></label>
                    <label className='container'>G <input type='checkbox' name='G'value={produto.tamanho} checked={isCheck} onChange={handleChangeInput}/> <span className='checkmark'></span></label>
                    <label className='container'>GG<input type='checkbox' name='GG'value={produto.tamanho} checked={isCheck} onChange={handleChangeInput}/> <span className='checkmark'></span></label>
                </div>
                <div className='tamanho'>
                    <label className='container'>36<input type='checkbox' name='36'value={produto.tamanho} checked={isCheck} onChange={handleChangeInput}/> <span className='checkmark'></span></label>
                    <label className='container'>38<input type='checkbox' name='38'value={produto.tamanho} checked={isCheck} onChange={handleChangeInput}/> <span className='checkmark'></span></label>
                    <label className='container'>40<input type='checkbox' name='40'value={produto.tamanho} checked={isCheck} onChange={handleChangeInput}/> <span className='checkmark'></span></label>
                    <label className='container'>42<input type='checkbox' name='42'value={produto.tamanho} checked={isCheck} onChange={handleChangeInput}/> <span className='checkmark'></span></label>
                    <label className='container'>44<input type='checkbox' name='44'value={produto.tamanho} checked={isCheck} onChange={handleChangeInput}/> <span className='checkmark'></span></label>
                </div> */