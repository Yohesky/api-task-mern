const express = require('express')
const router = express()
const {check} = require('express-validator')
const { autenticarUsuario, usuarioAutenticado } = require('../controllers/authController')
const auth = require('../middleware/auth')

router.post('/', autenticarUsuario)

router.get('/', 
    auth,
    usuarioAutenticado
)

module.exports = router