import React, {useState, useEffect} from 'react'
import axios from 'axios'

function CategoriaApi() {
    const [categorias, setCategorias] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getCategorias = async() => {
            const res = await axios.get('/api/categoria')
            setCategorias(res.data)
        }
        getCategorias()
    },[callback])
    return{
        categorias: [categorias, setCategorias],
        callback: [callback, setCallback]
    }
}
export default CategoriaApi