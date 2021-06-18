const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {
      // revisar si hay errores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()})
    }

    // extrar email y pass
    const {email,password} = req.body
    try {
        
        // revisar si esta registrado
        let usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'})
        }

        const passCorrecto = await bcrypt.compare(password, usuario.password)
        if(!passCorrecto){
            return res.status(400).json({msg: 'Password incorrecto'})
        }


        // si todo va bien crear el jwt
        const payload = {
            usuario: {
                id: usuario.id,
            }
        }

        // firmar el token
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600,
        }, (error,token) => {
            if(error) throw error;

            // mensaje de confirmacion
            res.json({token})

        })

    } catch (error) {
        console.log('err', error);
    }
  
}

exports.usuarioAutenticado = async (req,res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        res.json({usuario})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'})
    }
}