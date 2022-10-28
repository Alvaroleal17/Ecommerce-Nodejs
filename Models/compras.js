var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var compra = new Schema({
    producto: String,
    cantidad: Number,
    precio: Number
},
{ versionKey: false}
);
module.exports = mongoose.model("compras", compra);