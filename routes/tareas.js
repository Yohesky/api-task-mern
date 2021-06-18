const express = require('express')
const router = express()
const { check } = require('express-validator')
const { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } = require('../controllers/tareaController')
const auth = require('../middleware/auth')

router.post('/', 
    [
        auth,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),
    ],
    crearTarea    
)

router.get('/', auth, obtenerTareas  )

router.put('/:id', auth, actualizarTarea  )

router.delete('/:id', auth, eliminarTarea)


module.exports = router
