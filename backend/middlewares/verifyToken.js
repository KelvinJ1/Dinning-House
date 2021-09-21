const jwt = require('jsonwebtoken')

const tokenFunctions = {}

tokenFunctions.verifyToken = async (req, res, next) => {

    try {
        //verificar si el header authorization existe
        if(!req.headers.authorization){
            return res.status(401).json({message: "header authorization no existe"})
        }
        let isBearer = req.headers.authorization.split(' ')[0]
        //Bearer
        let token = req.headers.authorization.split(' ')[1]
        //<token>
        if(isBearer !== 'Bearer' || !token){
            res.status(401).json({message: "Formato del token no valido"})
        }
        const payload = jwt.verify(token, 'pato')
        if(!payload){
            return res.status(401).json({message: "Token no permitido"}) 
        }
        req.decoded = {
            _id: payload._id,
            email: payload.email,
            role: payload.role
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: "Error en el request", error})
    }
}

module.exports = tokenFunctions