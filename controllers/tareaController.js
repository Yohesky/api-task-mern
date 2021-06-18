const { validationResult } = require("express-validator")
const Proyecto = require("../models/Proyecto")
const Tareas = require("../models/Tareas")


exports.crearTarea = async (req,res) => {
  // revisar si hay errores
  const errores = validationResult(req)
  if( !errores.isEmpty() ){
      return res.status(400).json({errores: errores.array()})
  }



  try {
    const { proyecto } = req.body
      
    const existeProyecto = await Proyecto.findById(proyecto)
    if(!existeProyecto){
        return res.status(404).json({msg: 'Proyecto no encontrado'})
    }

    
    if(existeProyecto.creador.toString() !== req.usuario.id ){
        return res.status(401).json({msg: 'No autorizado'})
    }

    const tarea = new Tareas(req.body)
    await tarea.save()
    res.json({tarea})


  } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error')
  }
}

exports.obtenerTareas = async (req, res) => {
    try {
        
        const { proyecto } = req.query
      
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'})
        }

        const tareas = await Tareas.find({proyecto})
        res.json({tareas})


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarTarea = async (req,res) => {
    try {
        
        const { proyecto, nombre, estado } = req.body
      

        let existeTarea = await Tareas.findById(req.params.id)
        if(!existeTarea){
            return res.status(404).json({msg: 'Tarea no encontrada'})
        }


        const existeProyecto = await Proyecto.findById(proyecto)
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'})
        }

       
        const nuevaTarea = {}

        nuevaTarea.nombre = nombre
        nuevaTarea.estado = estado

        existeTarea = await Tareas.findByIdAndUpdate({_id: req.params.id}, nuevaTarea, {
            new: true
        }) 

        res.json({existeTarea})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.eliminarTarea = async (req,res) => {
    try {
        
        const { proyecto } = req.query
      

        let existeTarea = await Tareas.findById(req.params.id)
        if(!existeTarea){
            return res.status(404).json({msg: 'Tarea no encontrada'})
        }


        const existeProyecto = await Proyecto.findById(proyecto)
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'})
        }

        // eliminar tarea
        await Tareas.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Tarea eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}