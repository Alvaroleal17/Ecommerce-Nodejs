var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Configurar el bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Cargar archivos estaticos
app.use(express.static("Public"));

//Mongoose
mongoose
  .connect(
    "mongodb+srv://alvaro_0817:A65708589l@cluster0.cbh2tqk.mongodb.net/Supermercado?retryWrites=true&w=majority"
  )
  .then(function (db) {
    console.log("Conectado a la base de datos");
  })
  .catch(function (err) {
    console.log(err);
  });
//Modelo de datos

//Productos
var Produc = require("./models/productos");

//Compras
var Compr = require("./models/compras");

//Pagos
var Pagos = require("./models/pagos");


//Rutas

//Vista de Inicio
app.get("/inicio", async function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//Fin

//Vista de Pagos
app.get("/pagos", async function (req, res) {
  var documentos = await Pagos.find();
  console.log(documentos);
  res.sendFile(__dirname + "/pagos.html");
});
app.post("/pagos", async function (req, res) {
  var datos_ajax = req.body;
  var p = new Pagos(datos_ajax);
  await p.save();
  res.send(p);
});

//Comprar
app.post("/compra", async function (req,res){
  var datos = req.body;
  var p = new Compr(datos);
  await p.save();
  console.log(p);

  
  var tabla = "<tr>";
  tabla += "<td>"+ p.producto +"</td>";
  tabla += "<td>"+ p.precio +"</td>";
  tabla += "<td>"+ p.cantidad +"</td>";
  tabla += "<td>" + "<button id='"+ p._id +"' class='eliminar btn badge btn-danger'>X</button>" + "</td>";
  tabla += "</tr>"
 
  res.send(tabla)
});
//Delete
app.delete("/compra/:id", async function (req, res) {
  var parametro = req.params.id;
  console.log("Documento eliminado: " + parametro);

  var p = await Compr.findById(parametro);
  await p.remove();
  res.send(p);
});


//Listen
app.listen(3000, function () {
  console.log("Servidor iniciado");
});
