const Users = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
    registro: async (req, res) =>{
        try {
            const {nome, email, senha} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "Esse email já existe."})

            if(senha.length < 6) 
                return res.status(400).json({msg: "Senha tem que possuir mais do quê 6 caracteres."})

        
            const senhaHash = await bcrypt.hash(senha, 10)
            const newUser = new Users({
                nome, email, senha: senhaHash
            })

            await newUser.save()

            
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, senha} = req.body

            const user = await Users.findOne({email})
            if(!user) 
            return res.status(400).json({msg: "Usuario não existe."})

            const isMatch = await bcrypt.compare(senha, user.senha)
            if(!isMatch)
            return res.status(400).json({msg: "Senha incorreta."})

            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
            })

            res.json({accesstoken})

            
        } catch (err) {
            return res.status(500).json({msg: err.message})

        }

    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken',{path: '/user/refresh_token'})
            return res.json({msg: 'Logout'})
        } catch (err) {
            return res.status(500).json({msg: err.message})

        }
    },
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-senha')
            if(!user)
            return res.status(400).json({msg: 'Usuario não existe.'})
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})

        }
    },
}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userController