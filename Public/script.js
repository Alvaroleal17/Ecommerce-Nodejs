$(document).ready(function () {
  var carrito_vacio = true;
  //Ocultar Tabla de productos en el inico de pagina
  $(function () {
    $("#tablaProductos").hide();
    $("#mensaje_carrito").hide();
  });
  //Mostrar los productos por medio del logo
  $(".logo").on("click", function (e) {
    e.preventDefault();
    $("#productos").show();
    $("#mensaje_carrito").hide();
    $("#producto_fresa").hide();
    $("#producto_manzana").hide();
    $("#producto_pollo").hide();
    $("#producto_carne").hide();
    $("#producto_pan").hide();
    $("#producto_galleta").hide();
    $("#producto_helado").hide();
    $("#producto_cerveza").hide();
    $("#tablaProductos").hide();
  });

  //Mostrar detalles de Fresa
  $("#img_fresa").on("click", function (e) {
    e.preventDefault();
    $("#productos").hide();
    $("#producto_fresa").show();
    $("#tablaProductos").hide();
  });

  //Mostrar detalles de Manzana
  $("#img_manzana").on("click", function (e) {
    e.preventDefault();
    $("#productos").hide();
    $("#producto_manzana").show();
    $("#tablaProductos").hide();
  });

  //Mostrar detalles de  Pollo
  $("#img_pollo").on("click", function (e) {
    e.preventDefault();
    $("#productos").hide();
    $("#producto_pollo").show();
    $("#tablaProductos").hide();
  });

  //Mostrar detalles de Carne
  $("#img_carne").on("click", function (e) {
    e.preventDefault();
    $("#productos").hide();
    $("#producto_carne").show();
    $("#tablaProductos").hide();
  });

  //Mostrar detalles de Pan
  $("#img_pan").on("click", function (e) {
    e.preventDefault();
    $("#productos").hide();
    $("#producto_pan").show();
    $("#tablaProductos").hide();
  });

  //Mostrar detalles de Galleta
  $("#img_oreo").on("click", function (e) {
    e.preventDefault();
    $("#productos").hide();
    $("#producto_galleta").show();
    $("#tablaProductos").hide();
  });

  //Mostrar detalles de Helado
  $("#img_helado").on("click", function (e) {
    e.preventDefault();
    $("#productos").hide();
    $("#producto_helado").show();
    $("#tablaProductos").hide();
  });

  //Mostrar detalles de Cerveza
  $("#img_cerveza").on("click", function (e) {
    e.preventDefault();
    $("#productos").hide();
    $("#producto_cerveza").show();
    $("#tablaProductos").hide();
  });

  //Fin detalles de productos

  //Mostrar "Gracias por su compra"

  $(function () {
    $(".pago").show();
    $("#gracias").hide();
  });
  $("#btn-pagar").on("click", function (e) {
    e.preventDefault();
    $(".pago").hide();
    $("#gracias").show();
  });
  //Fin Mostrar "Gracias por su compra"

  //Mostrar Tabla Productos
  $(".btn-productos").on("click", function (e) {
    e.preventDefault();
    if(carrito_vacio){
      $("#mensaje_carrito").show()
    }else{
      $("#tablaProductos").show();
    }
    $("#productos").hide();
    $("#producto_fresa").hide();
    $("#producto_manzana").hide();
    $("#producto_pollo").hide();
    $("#producto_carne").hide();
    $("#producto_pan").hide();
    $("#producto_galleta").hide();
    $("#producto_helado").hide();
    $("#producto_cerveza").hide();
  });
  //Fin Tabla Productos

  //Datos de pago
  $("#btn-pagar").click(function (e) {
    e.preventDefault();
    var datos = $("#form_pago").serialize();
    $.ajax({
      url: "/pagos",
      type: "POST",
      data: datos,
      success: function (respuesta) {
        console.log(respuesta);
      },
    });
  });
  //Fin Datos de pago

  //Acción Botón Comprar
  var rta = 0;
  $(".btn_ingresar").click(function (e) {
    e.preventDefault();
    var p = $(this).attr("id");
    console.log(p);
    $.ajax({
      url: "/compra",
      type: "POST",
      data: {
        producto: $("#nombre_" + p).text(),
        cantidad: $("#cantidad_" + p).val(),
        precio: $("#precio_" + p).text(),
      },
      success: function (respuesta) {
        $("#miTabla").append(respuesta);

        var total = $("#precio_" + p).text();
        var cantidad = $("#cantidad_" + p).val();
        rta += parseInt(total) * parseInt(cantidad);

        carrito_vacio = false;

        $("#total").text(rta);
        console.log(rta);
        //Delete row
        $(".eliminar").click(function () {
          $(this).closest("tr").remove();

          //Delete BD
          console.log(p);
          $.ajax({
            url: "/compra/" + $(this).attr("id"),
            type: "delete",
            success: function (respuesta) {
              rta -= respuesta.precio
              $("#total").text(rta);

              console.log(respuesta);
            },
          });
        });
      },
    });
  });
});
