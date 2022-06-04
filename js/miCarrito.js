let limitRetry = 3;
let flagLogueo = true;
let precioTotal = 0;
let aux;
let auxPrecio;
let productos = [];
let precios = [];

/*----------------------------------------------Funciones para recuperar productos del carrito--------------------------------------------*/

//Función mostrar popup de compra finalizada
function showToast (){
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 5000);
    toast.textContent = "El total de su compra es $" + precioTotal;
}

//Función mostrar carrito como array
function showCarrito (){
    mostrarCarrito = localStorage.getItem("carrito")
    mostrarCarritoPrecio = localStorage.getItem("precio")
    console.log(mostrarCarritoPrecio);
    if (mostrarCarrito){
        let auxiliar = mostrarCarrito.split (",");
        let auxiliarPrecio = mostrarCarritoPrecio.split(",")
        productos = auxiliar;
        precios = auxiliarPrecio;
    }else{
        console.warn("No hay productos en el carro");
    } 
}   

//Función agregar productos al array carrito
const agregarCarrito = (producto) => {
    carrito.push(producto);
    localStorage.setItem("carrito", carrito);
}

//Función agregar productos al array carrito
const agregarCarritoPrecio = (producto) => {
    carritoPrecios.push(producto);
    localStorage.setItem("precio", carritoPrecios); 
}

//Función para quitar todos los productos del carrito
function limpiarCarrito (){
    mostrarCarrito = localStorage.clear("carrito");
    productos = [];
    precios = [];
    precioTotal = 0;
}

//función para agregar producto comprado al array nombreProductos
function finalizarCompra (){ 
    for (const precio of precios) {
        precioTotal += parseInt(precio)    
    }
    return precioTotal
}

//Botón Finalizar compra
function btnFinalizarCompra (){
    btnConfirma.innerHTML = `<button id="btnFinaliza" onclick = "showToast()" class="waves-effect waves-light btn" type="submit">Confirmar compra</button>
    <br><br>`
}

//Botón Limpiar Carrito
function btnVaciar (){
    btnLimpia.innerHTML = `<button id="btnVacia" class="waves-effect waves-light btn" type="submit">Vaciar carrito</button>
    <br><br>`
}

//Botón Mostrar Carrito
function btnGeneraTabla (){
    btnCrearTabla.innerHTML = `<button id="btnComprar" class="waves-effect waves-light btn" type="submit">Mostrar carrito</button>
    <br><br>`
}

//Función Generar Tabla de productos comprados
function generarTabla (){
    let tabla   = document.createElement("table");                                           //crea etiqueta table en miCarrito
    let tblBody = document.createElement("tbody");                                           //crea etiqueta tbody en miCarrito

    const headTabla = ["Producto", "Precio", "Cantidad", "Total"]

    for(k = 0 ; k < headTabla.length; k += 1){
        let tablaHead = document.createElement("th");                                       //crea etiqueta thead en miCarrito
        let celdaEncabezado = document.createElement("td");                                 //crea etiqueta td en miCarrito
        let textoCeldaEncabezado = document.createTextNode(headTabla[k]);                   //Escribe cada Encabezado
        celdaEncabezado.appendChild(textoCeldaEncabezado);                                  //Agrega texto a encabezado
        tablaHead.appendChild(celdaEncabezado);                                             //Agrega encabezado a la tabla
        tblBody.appendChild(tablaHead);                                                     //Agrega encabezado a body
    }
    for (i = 0; i < productos.length; i += 1) {
        let fila = document.createElement("tr");                                            //Crea nueva fila
        let celdaUno = document.createElement("td");                                        //Agrega etiqueda td en miCarrito (1era celda de fila)
        let textoCeldaUno = document.createTextNode(productos[i]);                                   //Escribe número de alumno
        celdaUno.appendChild(textoCeldaUno);                                                //Agrega el número de alumno a la celda
        fila.appendChild(celdaUno);                                                         //Agrega a la fila la celda
        tblBody.appendChild(fila);                                                          //Agrega al body la fila
        let celdaDos = document.createElement("td");                                        //Agrega etiqueda td en miCarrito (2da celda de fila)
        let textoCeldaDos = document.createTextNode(precios[i]);                         //Escribe nota asociada al número de alumno
        celdaDos.appendChild(textoCeldaDos);                                                //Agrega nota a la celda
        fila.appendChild(celdaDos);                                                         //Agrega la fila la celda
        tblBody.appendChild(fila);                                                          //Agrega la fila al body
    }
    tabla.appendChild(tblBody);
    btnCrearTabla.appendChild(tabla);
}

//Función sweet alert
function compraConfirmada (){
    finalizarCompra();
    swal("Su compra fue confirmada", "El total de su compra es $" + precioTotal, "success");
    showToast();
}
//----------------------------------------------------COMIENZO DE MAIN-----------------------------------------------------//

const btnCrearTabla = document.querySelector("#btnTabla")
const btnConfirma = document.querySelector("#btnFinalizar")
const toast = document.querySelector("#toast")
const btnLimpia = document.querySelector("#btnLimpiar")

btnGeneraTabla();
btnFinalizarCompra();
btnVaciar();

showCarrito();

console.log(productos)
for (const producto of productos) {
    console.log(producto);
}
for (const producto of precios) {
    console.log(producto);
}

btnCrearTabla.addEventListener("click", function (e){
    e.preventDefault();
    generarTabla();
});

btnConfirma.addEventListener("click", function (e){
    e.preventDefault();
    compraConfirmada();
    console.log("El total de su compra es " + precioTotal);
    limpiarCarrito(); 
});

btnLimpia.addEventListener("click", function (e){
    e.preventDefault();
    limpiarCarrito();
});