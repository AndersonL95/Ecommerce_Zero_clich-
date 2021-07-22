require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connect = require('./config/db')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()

connect()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
console.log('Server está rodando na porta ', PORT)})
app.use(fileUpload({
    useTempFiles: true
}))


app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/tamanhoRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/', require('./routes/freteRouter'))
app.use('/api', require('./routes/paymentRouter'))



