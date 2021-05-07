const Users = require('../models/User')

const authAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            _id: req.user.id
        })
        if(user.cargo ===0)
            return res.status(400).json({msg: 'Acesso negado! Recursos de administração.'})

        next()

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

}
module.exports = authAdmin