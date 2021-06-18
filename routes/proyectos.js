const express = require('express')
const router = express()
const { check } = require('express-validator')
const { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } = require('../controllers/proyectoController')
const auth = require('../middleware/auth')

router.post('/', 
    [   
        auth, 
        check('nombre', 'El nombre del proyecto es requerido').not().isEmpty() 
    ],
    crearProyecto)

router.get('/', auth, obtenerProyectos)

router.put('/:id', 
    [   
        auth,
        check('nombre', 'El nombre del proyecto es requerido').not().isEmpty() 
    ], 
actualizarProyecto)

router.delete('/:id', 
    [   
        auth,
    ], 
eliminarProyecto)

module.exports = router
