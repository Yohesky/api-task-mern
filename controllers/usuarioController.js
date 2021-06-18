const Usuario = require("../models/Usuario");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {
    // revisar si hay errores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()})
    }

    const { email,password } = req.body

    try {

        let usuario = await Usuario.findOne({email})
        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'})
        }

        // instancia nuevo usuario
        usuario = new Usuario(req.body) 

        // hashear el password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt) 

        // guardar usuario
        await usuario.save()


        // crear y firmar el jsonwebtoken
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
        res.status(400).send('Hubo un error')
    }
}