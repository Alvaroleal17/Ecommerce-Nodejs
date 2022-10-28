const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const producto = new Schema({
    nombre: String,
    detalle: String,
    imgUrl: String,
    precio: Number
},
{ versionKey: false}
);
module.exports = mongoose.model("Productos", producto);