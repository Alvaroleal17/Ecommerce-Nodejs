const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pago = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    direccion: String,
    debito: String,
    credito: String,
    titular: String,
    tarjeta: String,
    expiracion: String,
    CVV: String,
},
{ versionKey: false}
);
module.exports = mongoose.model("pagos", pago);