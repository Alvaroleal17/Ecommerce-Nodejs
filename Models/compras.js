const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const compra = new Schema({
    producto: String,
    cantidad: Number,
    precio: Number
},
{ versionKey: false}
);
module.exports = mongoose.model("compras", compra);