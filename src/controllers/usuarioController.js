// Se crea la clase para administrar los usuarios
const usuario = require('../models/usuario');

const jwt = require('jsonwebtoken');

class UsuarioController {

    constructor() {
    }
    // Para registar los usuarios
    registrar(req, res) {
        let objUser = req.body;
        if (objUser.identificacion &&
            objUser.primernombre &&
            objUser.segundonombre &&
            objUser.primerapellido &&
            objUser.segundoapellido &&
            objUser.direccion &&
            objUser.correo &&
            objUser.celular &&
            objUser.clave) {

            usuario.create(objUser, (error, data) => {
                if (error) {
                    res.status(500).json({ error });
                } else {
                    let token = jwt.sign({ id: data._id }, "M4scotAs2021JwT5678")
                    res.status(201).json({ token });
                }
            });

        } else {
            res.status(400).json({ info: "Datos incompletos" })
        }

    }

    //Método y ruta para consultar todos los usuarios
    getUsuarios(req, res) {
        usuario.find((error, data) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(data);
            }
        });
    }

    //Update
    setUsuario(req, res) {
        //Capturar los datos del cuerpo de la petición
        let { id, identificacion, primernombre, segundonombre, primerapellido, segundoapellido, direccion, correo, celular, clave } = req.body;
        //Crear un objeto con los datos capturados del cuerpo de la petición. Encargado de actualizar en el método update
        let objUsuario = {
            identificacion, primernombre, segundonombre, primerapellido, segundoapellido, direccion, correo, celular, clave
        }
        //Actualizar un usuario por ID
        usuario.findByIdAndUpdate(id, { $set: objUsuario }, (error, data) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(data);
            }
        });
    }

    deleteUsuario(req, res) {
        let { id } = req.body;

        //Eliminar un usuario por ID
        usuario.findByIdAndRemove(id, (error, data) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(data);
            }
        });
    }

    login(req, res) {
        let { identificacion, clave } = req.body;
        usuario.findOne({ identificacion, clave }, (error, doc) => {
            if (error) {
                console.log("***********************")
                res.status(500).json({ mensaje: { error } });

            } else {
                if (doc != null && doc != undefined) {
                    let token = jwt.sign({ identificacion: doc._identificacion }, "M4scotAs2021JwT5678")
                    res.status(200).json({
                        token,
                        doc
                    });
                } else {

                    console.log("-----------------------------------")
                    console.log(doc)
                    res.status(401).json({ mensaje: "Identificacion o contraseña erroneos" });

                }
            }
        });
    }
}

module.exports = UsuarioController;