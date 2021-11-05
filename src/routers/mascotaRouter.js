// Importando express
const express = require('express');
// Importando el controlador de las mascotas
const MascotaController = require('../controllers/mascotaController');

class MascotaRouter{

    constructor(){
        this.router = express.Router();

        // Configurando las rutas
        this.config();
    }

    config(){
        // Creado objeto 
        const objMascotaController = new MascotaController();

        // Lo asignamos a la ruta
        this.router.post("/mascota", objMascotaController.registrarMascotas);
        this.router.get("/mascota/:id", objMascotaController.consultarMascotaId);
        this.router.get("/mascota_usuario/:id", objMascotaController.consultarMascotaId_usuario);
        this.router.get("/mascota", objMascotaController.getMascotas);
        this.router.put("/mascota/:id", objMascotaController.setMascotas);
        this.router.delete("/mascota/:id", objMascotaController.deleteMascotas);
    }

}

module.exports = MascotaRouter;