import React, {useState, useEffect} from 'react'
import axios from 'axios'

function UserApi(token) {
    const [seLogado, setSeLogado] = useState(false)
    const [seAdmin, setSeAdmin] = useState(false)
    const [carrinho, setCarrinho] = useState([])
    const [historico, setHistorico] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(()=> {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    setSeLogado(true)
                    res.data.cargo === 1 ? setSeAdmin(true) : setSeAdmin(false)

                    setCarrinho(res.data.carrinho)
                    
                } catch (err) {
                    alert(err.response.data.msg)
                }
            } 

            getUser()
        }   
    },[token])

    useEffect(() => {
        if(token) {
            const getHistrico = async() => {
                if(seAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistorico(res.data)
                }else{
                    const res = await axios.get('/user/historico', {
                        headers: {Authorization: token}
                    })
                    setHistorico(res.data)
                }
            }
            getHistrico()
        }
    },[token, callback, seAdmin])
    const addCarrinho = async (produto) => {
        if(!seLogado)
            return alert("Por favor, insira o login para continuar!")

            const check = carrinho.every(item =>{
                return item._id !== produto._id
            })
            if(check) {
                setCarrinho([...carrinho, {...produto, quantity: 1}])

                await axios.patch('/user/addCarrinho', {carrinho: [...carrinho, {...produto, quantity: 1}]},{
                    headers: {Authorization: token}
                })
            }else{
                alert('O produto foi adicionado ao carrinho.')
            }
    }
    return{
        seLogado: [seLogado, setSeLogado],
        seAdmin: [seAdmin, setSeAdmin],
        carrinho:[carrinho, setCarrinho],
        addCarrinho: addCarrinho,
        historico: [historico, setHistorico],
        callback: [callback, setCallback]
    }
}
export default UserApi