const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vacunaSchema = new Schema({
    nombre_vacuna:{
        type: String
    },
    fecha_ult_vacuna: {
        type: Date
    },
    notificacion: {
        type: Boolean
    }  
},{
    collection: 'vacunas'
});

module.exports = mongoose.model('vacuna', vacunaSchema);
