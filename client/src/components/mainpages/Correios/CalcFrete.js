import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import {GlobalState} from '../../../GlobalState'
import FreteResult from './FreteResult'
import axios from 'axios'

function CalcFrete(produto) {

  const state = useContext(GlobalState)
  const [produtos] = state.produtosApi.produtos
  const [events, setEvents] = useState([])
  const params = useParams()
  
  const [envio, setEnvio] = useState([])
  const [dest, setDest] = useState()
  const nCdServico = '04014'
  envio.sCepDestino = dest
 
  useEffect(() => {
    if(params.id){
        produtos.forEach(produto => {
            if(produto._id === params.id) setEnvio(produto)
            
        })
    }
}, [params.id, envio])
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/frete',{...envio, nCdServico} )
      .then(response => response.json())
      .then(envio =>{
        
      })
    } catch (err) {
      
    }
    console.log(envio)
    
  }
  const handleChange = e => {
    const {name, value} = e.target
    
    
  }
  
  return(
    
    <div className='CalcFrete'>
      
      <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Calcular frete </label>
            <input type='text'name='sCepDestino' placeholder='Digite o seu Cep.' value={dest} onChange={e => setDest(e.target.value)}/>
            <Button type='submit' name='' id='calcular' >Calcular</Button>
          </div>

      </form>
      <FreteResult events={events} />
    </div>
  )

}
export default CalcFrete
 





/* <select name='nCdServico' placeholder='Serviço' onChange={onChange}>
                <option  value='04014'>Sedex</option>
                <option  value='04510'>Pac</option>
              </select>*/