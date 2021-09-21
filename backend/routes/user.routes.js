const { Router } = require('express')
const usersControllers = require('../controllers/user.controllers')
const router = Router();
const tokenFunctions = require('../middlewares/verifyToken')

router.get('/', tokenFunctions.verifyToken, usersControllers.sayHi)
router.post('/signup', usersControllers.signup)
router.post('/signin', usersControllers.signin)

module.exports = router