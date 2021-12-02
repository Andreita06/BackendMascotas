//Importar express
const express = require('express');
//Importar cors
const cors = require("cors");

require('dotenv').config();
//Importar mongoose
const mongoose = require('mongoose');
//Importar url de conexión a la BD
const DatabaseConnection = require('./database/databaseConnection');
// Importando otras rutas
const MascotaRouter = require('./routers/mascotaRouter');
const UsuarioRouter = require('./routers/usuarioRouter');
const VacunaRouter = require('./routers/vacunaRouter');

class Server {
    //constructor
    constructor() {
        //Construir objeto de conexión a la BD
        const dbConnection = new DatabaseConnection();

        // Crear app express
        this.app = express();

        //Configurar parámetros de express para levantar el servidor
        this.config();
    }

    config() {

        //Indicar el puerto por el que se ejecutará el servidor
        this.app.set('port', process.env.PORT || 3000);

        //Indicar que las solicitudes http se trabajará en JSON
        this.app.use(express.json());
        this.app.use(cors());

          
        // Rutas
        const router = express.Router();
        router.get('/', (req, res) => {
            console.log("Nueva conexión");
            res.status(200).json({ message: "Bienvenido a Vacunación Mascotas!" });
        });

        // Creando rutas
    
        const mascotaRouter = new MascotaRouter();
        const vacunaRouter = new VacunaRouter();
        const usuarioRouter = new UsuarioRouter();

        //añadir las rutas al servidor
        this.app.use(router);
        this.app.use(mascotaRouter.router);
        this.app.use(usuarioRouter.router);
        this.app.use(vacunaRouter.router);

        //Levantar el servidor/correr el servidor
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor corriendo por el puerto => ", this.app.get('port'));
        });
    }
}

// Se instancia la clase
const objServer = new Server();
