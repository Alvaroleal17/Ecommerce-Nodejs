var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var producto = new Schema({
    nombre: String,
    detalle: String,
    imgUrl: String,
    precio: Number
},
{ versionKey: false}
);
module.exports = mongoose.model("Productos", producto);