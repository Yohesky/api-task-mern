const express = require('express')
const router = express()
const { crearUsuario } = require('../controllers/usuarioController')
const {check} = require('express-validator')

// crear usuario
router.post('/',
    [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'Password minimo 6 caracteres').isLength({min: 6}),

    ]
,crearUsuario)

module.exports = router