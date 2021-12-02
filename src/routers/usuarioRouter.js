// Importando express
const {Router} = require('express');
const UsuarioController = require('../controllers/usuarioController');
const TokenController = require('../controllers/tokenController');
// Importando el controlador de los usuarios


class UsuarioRouter {

    constructor() {
        this.router = Router();

        // Configurando las rutas
        this.config();
    }

    config() {



        // let tokenC = new TokenController();




        // Creado objeto 
        const objUsuarioController = new UsuarioController();

        // Rutas Publicas
        this.router.post('/usuario', objUsuarioController.registrar);
        this.router.post('/login', objUsuarioController.login);

        //Midleware para verificar autorizacion para uso de rutas
        // this.router.use(tokenC.verifyAuth);
        
        //Rutas Privadas
        this.router.get('/usuario', objUsuarioController.getUsuarios);
        this.router.put('/usuario/:id', objUsuarioController.setUsuario);
        this.router.delete('/usuario/:id', objUsuarioController.deleteUsuario);
    }

}

module.exports = UsuarioRouter;