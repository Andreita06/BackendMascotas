const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    identificacion: {
        type: Number
    },
    primernombre: {
        type: String
    },
    segundonombre: {
        type: String
    },
    primerapellido: {
        type: String
    },
    segundopellido: {
        type: String
    },
    direccion: {
        type: String
    },
    correo: {
        type: String
    },
    celular: {
        type: String
    },
    clave: {
        type: String
    }
},{
    collection: 'usuarios'
});

module.exports = mongoose.model('usuario', usuarioSchema);