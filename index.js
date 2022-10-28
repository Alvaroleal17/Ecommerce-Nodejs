const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();


//Configurar el bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Cargar archivos estaticos
app.use(express.static("Public"));

//Mongoose
mongoose
  .connect(process.env.STRING_CONEXION)
  .then(function (db) {
    console.log("Conectado a la base de datos");
  })
  .catch(function (err) {
    console.log(err);
  });
//Modelo de datos

//Productos

//Compras
const Compr = require("./models/compras");

//Pagos
const Pagos = require("./models/pagos");


//Rutas

//Home
app.get("/", async function (req, res) {
  res.sendFile(__dirname + "/index.html");
});


//Payments
app.get("/pagos", async function (req, res) {
  let documentos = await Pagos.find();
  console.log(documentos);
  res.sendFile(__dirname + "/pagos.html");
});

app.post("/pagos", async function (req, res) {
  let datos_ajax = req.body;
  let p = new Pagos(datos_ajax);
  await p.save();
  res.send(p);
});

//To buy
app.post("/compra", async function (req,res){
  let datos = req.body;
  let p = new Compr(datos);
  await p.save();
  console.log(p);

  
  let tabla = "<tr>";
  tabla += "<td>"+ p.producto +"</td>";
  tabla += "<td>"+ p.precio +"</td>";
  tabla += "<td>"+ p.cantidad +"</td>";
  tabla += "<td>" + "<button id='"+ p._id +"' class='eliminar btn badge btn-danger'>X</button>" + "</td>";
  tabla += "</tr>"
 
  res.send(tabla)
});

//Delete
app.delete("/compra/:id", async function (req, res) {
  let parametro = req.params.id;
  console.log("Documento eliminado: " + parametro);

  let p = await Compr.findById(parametro);
  await p.remove();
  res.send(p);
});


//Listen
app.listen(3000, function () {
  console.log("Servidor iniciado");
});
