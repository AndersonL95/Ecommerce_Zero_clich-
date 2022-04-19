import { useState, useEffect} from 'react'
import axios from 'axios'


function ProdutosApi() {
    const [produtos, setProdutos] = useState([])
    const [callback, setCallback] = useState(false)
    const [categoria, setCategoria] = useState('')
   
    const [result, setResult] = useState(0)

    useEffect(() =>{
        const getProdutos = async () => {
            const res = await axios.get(`/api/produtos?limit=${page*9}&${categoria}&${sort}&titulo[regex]=${search}`)
            setProdutos(res.data.produtos)
            setResult(res.data.result)
        }
        getProdutos()
    }, [callback, categoria, sort, search, page])
    
    return {
        produtos: [produtos, setProdutos],
        callback: [callback, setCallback],
        categoria:[categoria, setCategoria],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
    }

}
export default ProdutosApi