import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { Button } from '@material-ui/core';
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'



const initialValue = {
  sCepOrigem: String,
  sCepDestino: String,
  nVlPeso: Number,
  nCdFormato: Number,
  nVlComprimento: Number,
  nVlAltura: Number,
  nVlLargura: Number,
  nCdServico: Array,
  nVlDiamentro: Number,

}
function Frete() {
  const state = useContext(GlobalState)
  const [values, setValues] = useState(initialValue)
  const history = useHistory()
  const [token] = state.token

  function onChange(e) {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }
  const onSubmit = async e => {
    e.preventDefault()
  
    try {
      await axios.post('api/frete',{...values}, {
        headers: {Authorization: token}
    })
      .then(res => {
        this.setValues({value: res.value})
      })   
    }catch (err) {
      
      
    }
      console.log(values)

    }
  
  return(
    
    <div className='container' name='form'>
      <form onSubmit={onSubmit}>
          <div className='form-group'>
              <input type='text' name='sCepOrigem' placeholder='Cep de origem'   onChange={onChange}/>
              <input type='text'name='sCepDestino' placeholder='Cep de Destino' onChange={onChange}/>
              <input type='text'name='nVlPeso' placeholder='Peso'onChange={onChange}/>
              <input type='text' name='nCdFormato' placeholder='Formato' onChange={onChange}/>
              <input type='text' name='nVlComprimento' placeholder='Comprimento'  onChange={onChange}/>
              <input type='text' name='nVlAltura' placeholder='Altura'onChange={onChange}/>
              <input type='text' name='nVlLargura'placeholder='Largura' onChange={onChange}/>
              <select multiple={true} value={['04014'],['04510']} type='text' name='nCdServico' placeholder='Serviço' onChange={onChange}>
                <option  value='04014'>Sedex</option>
                <option  value='04510'>Pac</option>
              </select>
              <input type='text' name='nVlDiamentro' className='form-control' placeholder='Diametro' onChange={onChange}/>
          </div>
          <Button type='submit' name='' id='calcular' >Buscar</Button>

      </form>
    </div>
  )

}
export default Frete

/* const submitHandler = (e) => {
    e.preventDefault()

const formData = new FormData(e.target)
const data = Object.fromEntries(formData)

axios.post(`http://localhost:5000/api/?frete`,data)
   .then(response => response.json())
    .then(console.log)
    .catch(error => console.log(error))
      console.log(data)

}
*/