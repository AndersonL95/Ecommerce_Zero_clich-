import { useState, useEffect} from 'react'
import axios from 'axios'


function ProdutosApi() {
    const [produtos, setProdutos] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getProdutos = async () => {
            const res = await axios.get('/api/produtos')
            setProdutos(res.data.produtos)
        }
        getProdutos()
    }, [callback])
    
    return {
        produtos: [produtos, setProdutos],
        callback: [callback, setCallback]
    }

}
export default ProdutosApi