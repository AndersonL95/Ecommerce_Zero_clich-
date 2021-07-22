import React, {useContext, useState} from 'react'
import {Button} from '@material-ui/core'
import {GlobalState} from '../../../GlobalState'
import FreteResult from './FreteResult'
import axios from 'axios'

function CalcFrete() {

  const state = useContext(GlobalState)
  const [produtos] = state.produtosApi.produtos
  const [events, setEvents] = useState([])
  const [produto, setProduto] = useState()
  const nCdServico = '04014, 04510'

  const convertToarray = (obj) => {
    const arr = [obj]
    return arr
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/frete',{...produto, nCdServico })
      .then(response => response.json())
      .then(produtos =>{
        const array = convertToarray(produtos)
        console.log(array)
        setEvents(array)
      })
    } catch (err) {
      
    }
  }
  const handleChangeInput =  e => {
    const {name, value} = e.target
        setProduto({...produto, [name]:value})
    }
  
  return(
    
    <div className='CalcFrete'>
      <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Calcular frete </label>
            <input type='text'name='sCepDestino' placeholder='Digite o seu Cep.' onChange={handleChangeInput}/>
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