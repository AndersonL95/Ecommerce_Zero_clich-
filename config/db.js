const mongoose = require('mongoose')
require('dotenv').config()

module.exports = connect = async () =>{
    const URI =  process.env.MONGODB_URL
    await mongoose.connect(URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err =>{
        if(err) throw err
        console.log('Conectado ao MongoDB!')
    })

    
    
}