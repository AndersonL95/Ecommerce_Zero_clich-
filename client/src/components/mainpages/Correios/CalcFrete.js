import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import {GlobalState} from '../../../GlobalState'
import FreteResult from './FreteResult'
import axios from 'axios'




function CalcFrete(produto) {

  const state = useContext(GlobalState)
  const [produtos] = state.produtosApi.produtos
  const params = useParams()
  
  const [envio, setEnvio] = useState([])
  const [dest, setDest] = useState()
  const [events, setEvents] = useState([])

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
    const res = await axios.post('/frete',{...envio, nCdServico} )
    const valor =  res.data[0].Valor
    const prazo = res.data[0].PrazoEntrega
    const result = `<td>O valor do frete é: <b> ${valor} </b> E o prazo de entrega é: ${prazo} dias úteis</td>`
    document.getElementById('resultado').innerHTML = result


  }
  
    
  
  return(
    
    <div className='CalcFrete'>
      <form onSubmit={handleSubmit} >
        
          <div className='form-group'>
            <label>Calcular frete </label>
            <input 
              type='text'
              name='sCepDestino' 
              placeholder='Digite o seu Cep.' 
              value={dest} 
              onChange={e => setDest(e.target.value)}
            />
           
             
            <Button type='submit' name='' id='calcular'  >Calcular</Button>
            <div id='resultado'></div>
          </div>

      </form>
      
    </div>
  )

}
export default CalcFrete
 





