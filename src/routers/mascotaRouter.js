// Importando express
const express = require('express');
// Importando el controlador de las mascotas
const MascotaController = require('../controllers/mascotaController');
const TokenController = require('../controllers/tokenController');

class MascotaRouter {

    constructor() {
        this.router = express.Router();

        // Configurando las rutas
        this.config();
    }

    config() {


        let tokenC = new TokenController();
        //Midleware para verificar autorizacion para uso de rutas


        this.router.use(tokenC.verifyAuth);

        // Creado objeto 
        const objMascotaController = new MascotaController();

        // Rutas privadas
        this.router.post("/mascota", objMascotaController.registrarMascotas);
        this.router.get("/mascota/:id", objMascotaController.consultarMascotaId);
        this.router.get("/mascota_usuario", objMascotaController.consultarMascotaId_usuario);
        this.router.get("/mascota", objMascotaController.getMascotas);
        this.router.put("/mascota/", objMascotaController.setMascotas);
        this.router.delete("/mascota/", objMascotaController.deleteMascotas);
    }

}

module.exports = MascotaRouter;