const vacuna = require('../models/vacuna');

class VacunaController{

    constructor(){

    }

    acceder(req, res){
        vacuna.create(req.body, (error, data)=>{
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(201).json(data);
            }
        });
    }

    //Método y ruta para consultar vacuna
    getVacuna(req, res) {
        vacuna.find((error, data) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(data);
            }
        });
    }

    // Actualizar Vacuna
    setVacuna(req, res) {
        //Capturar los datos del cuerpo de la petición
        let { id, nombre_vacuna, fecha_ult_vacuna, notificacion } = req.body;
        //Crear un objeto con los datos capturados del cuerpo de la petición. Encargado de actualizar en el método update
        let objVacuna = {
            nombre_vacuna, fecha_ult_vacuna, notificacion
        }
        //Actualizar vacuna por ID
        vacuna.findByIdAndUpdate(id, { $set: objVacuna }, (error, data) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(data);
            }
        });
    }
    
    // Eliminar vacuna
    deleteVacuna(req, res) {
        let { id } = req.body;

        //Eliminar una vacuna por ID
        vacuna.findByIdAndRemove(id, (error, data) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                res.status(200).json(data);
            }
        });
    }
}

module.exports = VacunaController;