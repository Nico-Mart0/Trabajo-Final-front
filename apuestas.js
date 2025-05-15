const fecha = new Date();
const opciones = {day:"2-digit", month:"2-digit", year:"numeric"};
document.getElementById("fecha").textContent = fecha.toLocaleDateString("es-ES", opciones); 

//////////////////////////////////////////////////////////////

let autos = JSON.parse(localStorage.getItem("autos")) || [];

function guardarAutos() {
    localStorage.setItem("autos", JSON.stringify(autos));
}

function mostrarAutos() {
    const lista = document.getElementById("listaAutos");
    lista.innerHTML = "";
    autos.forEach((auto, index) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <span>${auto.modelo} - ${auto.serie}</span>
            <div class="actions">
                <button onclick="editarAuto(${index})" title="Editar">📝</button>
                <button onclick="eliminarAuto(${index})" title="Eliminar">🗑️</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

function agregarAuto() {
    const modelo = document.getElementById("modeloMotor").value;
    const serie = document.getElementById("numeroSerie").value;
    if (modelo && serie) {
        autos.push({ modelo, serie });
        guardarAutos();
        mostrarAutos();
        document.getElementById("modeloMotor").value = "";
        document.getElementById("numeroSerie").value = "";
    }
}

function editarAuto(index) {
    const auto = autos[index];
    const nuevoModelo = prompt("Nuevo modelo:", auto.modelo);
    const nuevaSerie = prompt("Nuevo número de serie:", auto.serie);
    if (nuevoModelo && nuevaSerie) {
        autos[index] = { modelo: nuevoModelo, serie: nuevaSerie };
        guardarAutos();
        mostrarAutos();
    }
}

function eliminarAuto(index) {
    if (confirm("¿Eliminar este auto?")) {
        autos.splice(index, 1);
        guardarAutos();
        mostrarAutos();
    }
}

////////////////////////////////////////////

let pagos = JSON.parse(localStorage.getItem("pagos")) || [];

function guardarPagos() {
    localStorage.setItem("pagos", JSON.stringify(pagos));
}

function mostrarPagos() {
    const lista = document.getElementById("listaPagos");
    lista.innerHTML = "";
    pagos.forEach((pago, index) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <span class="nombre">${pago.tarjeta}</span>
            <span class="banco">${pago.banco}</span>
            <span class="num"> - ${pago.numero} - </span>
            <div class="actions">
                <button onclick="editarPago(${index})" title="Editar">📝</button>
                <button onclick="eliminarPago(${index})" title="Eliminar">🗑️</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

function agregarPago() {
    const tarjeta = document.getElementById("nombreTarjeta").value;
    const banco = document.getElementById("bancoTarjeta").value;
    const numero = document.getElementById("numeroTarjeta").value;
    if (tarjeta && banco && numero) {
        pagos.push({ tarjeta, banco, numero });
        guardarPagos();
        mostrarPagos();
        document.getElementById("nombreTarjeta").value = "";
        document.getElementById("bancoTarjeta").value = "";
        document.getElementById("numeroTarjeta").value = "";
    }
}

function editarPago(index) {
    const pago = pagos[index];
    const nuevaTarjeta = prompt("Nuevo nombre de tarjeta:", pago.tarjeta);
    const nuevoBanco = prompt("Nuevo banco:", pago.banco);
    const nuevoNumero = prompt("Nuevo número de tarjeta:", pago.numero);
    if (nuevaTarjeta && nuevoBanco && nuevoNumero) {
        pagos[index] = {
            tarjeta: nuevaTarjeta,
            banco: nuevoBanco,
            numero: nuevoNumero
        };
        guardarPagos();
        mostrarPagos();
    }
}

function eliminarPago(index) {
    if (confirm("¿Estás seguro de eliminar este método de pago?")) {
        pagos.splice(index, 1);
        guardarPagos();
        mostrarPagos();
    }
}

/////////////////////////////////////////////////////////////////////

let apuestas = JSON.parse(localStorage.getItem("apuestas")) || [];

function guardarApuestas() {
    localStorage.setItem("apuestas", JSON.stringify(apuestas));
}

function mostrarApuestas() {
    const lista = document.getElementById("listaApuestas");
    lista.innerHTML = "";
    apuestas.forEach((apuesta, index) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <span class="apuestas">${apuesta.nombre}</span>
            <span class="monto">${apuesta.monto} USD</span>
            <span class="estado">${apuesta.estado}</span>
            <div class="actions">
                <button onclick="editarApuesta(${index})" title="Editar">📝</button>
                <button onclick="eliminarApuesta(${index})" title="Eliminar">🗑️</button>
                <button onclick="cambiarEstadoApuesta(${index})" title="Cambiar Estado">💱</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

function agregarApuesta() {
    const nombre = document.getElementById("nombreApuesta").value;
    const monto = document.getElementById("cantidadDinero").value;
    if (nombre && monto) {
        apuestas.push({ nombre, monto, estado: "Pendiente" });
        guardarApuestas();
        mostrarApuestas();
        document.getElementById("nombreApuesta").value = "";
        document.getElementById("cantidadDinero").value = "";
    }
}

function editarApuesta(index) {
    const apuesta = apuestas[index];
    const nuevoNombre = prompt("Nuevo nombre del auto:", apuesta.nombre);
    const nuevoMonto = prompt("Nuevo monto:", apuesta.monto);
    if (nuevoNombre && nuevoMonto) {
        apuestas[index] = { ...apuestas[index], nombre: nuevoNombre, monto: nuevoMonto };
        guardarApuestas();
        mostrarApuestas();
    }
}

function eliminarApuesta(index) {
    if (confirm("¿Eliminar esta apuesta?")) {
        apuestas.splice(index, 1);
        guardarApuestas();
        mostrarApuestas();
    }
}

function cambiarEstadoApuesta(index) {
    const estados = ["Pendiente", "En curso", "Terminado"];
    const actual = estados.indexOf(apuestas[index].estado);
    apuestas[index].estado = estados[(actual + 1) % estados.length];
    guardarApuestas();
    mostrarApuestas();
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos();
    mostrarApuestas();
    mostrarPagos();
});