const express = require('express')
const conectarDb = require('./config/db')
const cors = require('cors')
// crear el server
const app = express()

// conectar la db
conectarDb()

// habilitar cors
app.use(cors())

// puerto de la app
const PORT = process.env.PORT || 4000

// habilitar express json
app.use(express.json({ extended: true }))

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))




app.listen(PORT,() => {
    console.log('server on port', PORT);
})

