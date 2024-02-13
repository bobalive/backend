const Router = require('express')

const UserController = require('./UserController.js')

const router = new Router()

router.post('/signin' , UserController.signin)
router.post('/login' , UserController.login)
router.put('/block' , UserController.block)
router.delete('/delete/:id' , UserController.delete)
router.get('/users' , UserController.users)

module.exports = router