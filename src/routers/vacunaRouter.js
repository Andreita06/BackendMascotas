const express = require('express');
const VacunaController = require('../controllers/vacunaController');

class VacunaRouter{

    constructor(){
        this.router = express.Router();
        this.config(); 
    }

    config(){
        const objVacunaC = new VacunaController();
        this.router.post("/vacuna", objVacunaC.acceder);
    }

}

module.exports = VacunaRouter;