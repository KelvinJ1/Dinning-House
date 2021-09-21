const { Router } = require('express')
const menuControllers = require('../controllers/menu.controllers');
const router = Router();
const tokenFunctions = require('../middlewares/verifyToken')


console.log(tokenFunctions)
//router.get('/laruta', el middleware, el controlador)
router.get('/showAll', tokenFunctions.verifyToken, menuControllers.listar)
router.post('/create', tokenFunctions.verifyToken, menuControllers.create)

module.exports = router