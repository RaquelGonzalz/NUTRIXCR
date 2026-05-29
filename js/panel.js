import { obtenerSesion, cerrarSesionStorage } from "./storage.js";

import {
  registrarPaciente,
  cargarPacientes
} from "./pacientes.js";

import {
  guardarConsulta,
  mostrarHistorial,
  colocarFechaHoraActual,
  editarConsulta,
  eliminarConsulta
} from "./consultas.js";

/* =========================
   VALIDAR SESIÓN
========================= */
const nutriologo = obtenerSesion();

if (!nutriologo) {

  alert("Acceso bloqueado. Debes iniciar sesión.");

  window.location.href = "index.html";
}

/* =========================
   MOSTRAR NUTRIÓLOGO
========================= */
document.getElementById(
  "nutriologoActivo"
).textContent = `Nutriólogo: ${nutriologo}`;

/* =========================
   BOTÓN CERRAR SESIÓN
========================= */
document
  .getElementById("btnCerrarSesion")
  .addEventListener("click", cerrarSesion);

/* =========================
   GUARDAR PACIENTE
========================= */
document
  .getElementById("btnGuardarPaciente")
  .addEventListener("click", registrarPaciente);

/* =========================
   GUARDAR CONSULTA
========================= */
document
  .getElementById("btnGuardarConsulta")
  .addEventListener("click", guardarConsulta);

/* =========================
   CAMBIO DE PACIENTE
========================= */
document
  .getElementById("listaPacientes")
  .addEventListener("change", mostrarHistorial);

/* =========================
   BOTÓN ELIMINAR TODO
========================= */
document
  .getElementById("btnEliminarTodo")
  .addEventListener("click", eliminarTodo);

/* =========================
   FUNCIONES GLOBALES
========================= */
window.editarConsulta = editarConsulta;
window.eliminarConsulta = eliminarConsulta;

/* =========================
   CARGA INICIAL
========================= */
window.onload = function () {

  cargarPacientes();

  colocarFechaHoraActual();

  mostrarHistorial();
};

/* =========================
   CERRAR SESIÓN
========================= */
function cerrarSesion() {

  cerrarSesionStorage();

  window.location.href = "index.html";
}

/* =========================
   ELIMINAR TODO
========================= */
function eliminarTodo() {

  const confirmar = confirm(
    "¿Seguro que deseas eliminar TODOS los datos?"
  );

  if (!confirmar) {
    return;
  }

  /* BORRAR LOCALSTORAGE */
  localStorage.removeItem("pacientes");

  localStorage.removeItem("consultas");

  alert("Todos los datos fueron eliminados.");

  location.reload();
}