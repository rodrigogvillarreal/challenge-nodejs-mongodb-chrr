const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sitioSchema = new Schema({
    id: Number,
    nombre: String,
    imagen: String,
    descripcion: String,
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('sitiosInteres', sitioSchema);