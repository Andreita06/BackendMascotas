// Importando express
const express = require('express');
// Importando el controlador de los usuarios
const UsuarioController = require('../controllers/usuarioController');

class UsuarioRouter{

    constructor(){
        this.router = express.Router();

        // Configurando las rutas
        this.config();
    }

    config(){
        // Creado objeto 
        const objUsuarioController = new UsuarioController();

        // Lo asignamos a la ruta
        this.router.post("/usuario", objUsuarioController.registrar);
        this.router.get("/usuario", objUsuarioController.getUsuarios);
        this.router.put("/usuario/:id", objUsuarioController.setUsuario);
        this.router.delete("/usuario/:id", objUsuarioController.deleteUsuario);
        this.router.post("/login", objUsuarioController.login);
    }

}

module.exports = UsuarioRouter;