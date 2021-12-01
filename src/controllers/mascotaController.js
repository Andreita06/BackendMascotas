// Se crea la clase para administrar las mascotas
const mascotas = require('../models/mascota');

const jwt = require('jsonwebtoken');
const TokenController = require('./tokenController');

class MascotasController {

    constructor() {
        this.tokenC = new TokenController();
    }
    // Para registar las mascotas
    registrarMascotas = (req, res) => {

        let { tipo_mascota, nombre_mascota, edad_mascota, raza_mascota, alergias, desc_alergia } = req.body;

        let token = this.tokenC.getToken(req);
    
        let decode = jwt.decode(token, process.env.JWT_PRIVATE_TOKEN)
        let usuario_id= decode.identificacion;


        mascotas.create({ tipo_mascota, nombre_mascota, edad_mascota, raza_mascota, alergias, desc_alergia, usuario_id: usuario_id }, (error, doc) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(201).json(doc);
            }
        });
    }

    //Método para consultar mascota por ID

    consultarMascotaId(req, res) {
        let id = req.params.id;
        mascotas.findById(id, (error, data) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(data);
            }
        });
    }


    consultarMascotaId_usuario=(req, res)=> {
        //id a partir del token
        let token = this.tokenC.getToken(req);
        let decode= jwt.decode(token, process.env.JWT_PRIVATE_TOKEN);
        let usuario_id=decode.identificacion;
    

        //BUSQUEDA SE HACE AUTOMATICAMENTE CON EL TOKEN EN EL HEADER, NO ES NECESARIO MANDARLO POR OTRO LADO O COMO BODY   

        mascotas.find({ usuario_id}, (error, data) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(data);
            }
        });
    }

    //Método y ruta para consultar todos los mascotas
    getMascotas(req, res) {
        mascotas.find((error, data) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(data);
            }
        });
    }

    // Actualizar Mascota
    setMascotas=(req, res)=> {
        //Capturar los datos del cuerpo de la petición
        let {id, tipo_mascota, nombre_mascota, edad_mascota, raza_mascota, alergias, desc_alergia } = req.body;
        //Crear un objeto con los datos capturados del cuerpo de la petición. Encargado de actualizar en el método update
        let objMascotas = {
            tipo_mascota, nombre_mascota, edad_mascota, raza_mascota, alergias, desc_alergia
        }

        let token = this.tokenC.getToken(req);

        let decode = jwt.decode(token, process.env.JWT_PRIVATE_TOKEN)
        let usuario_id = decode.identificacion;


        //Actualizar una mascotas por ID
        mascotas.findOneAndUpdate({ _id: id, usuario_id: usuario_id }, {$set: objMascotas}, (error, data) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json({info:"Producto actualizado"});
            }
        });
    }

    // Eliminar mascotas
    deleteMascotas=(req, res)=> {
        let {id} = req.body;
        //id a partir del token
        let token = this.tokenC.getToken(req);
        let decode= jwt.decode(token, process.env.JWT_PRIVATE_TOKEN);
        let usuario_id=decode.identificacion;
   

        //Eliminar una mascotas por ID
        mascotas.findOneAndRemove({_id:id, usuario_id}, (error, doc) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(doc);
            }
        });
    }
}

module.exports = MascotasController;