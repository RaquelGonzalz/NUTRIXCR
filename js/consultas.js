import {
  obtenerSesion,
  obtenerConsultas,
  guardarConsultas
} from "./storage.js";

import {
  obtenerPacientePorId
} from "./pacientes.js";

/* =========================
   VARIABLE GLOBAL EDITAR
========================= */
let consultaEditandoId = null;

/* =========================
   FECHA Y HORA ACTUAL
========================= */
export function colocarFechaHoraActual() {

  const ahora = new Date();

  const fecha =
    ahora.toISOString().split("T")[0];

  const hora =
    ahora.toTimeString().slice(0, 5);

  document.getElementById("fecha").value =
    fecha;

  document.getElementById("hora").value =
    hora;
}

/* =========================
   GUARDAR CONSULTA
========================= */
export function guardarConsulta() {

  const idPaciente =
    document.getElementById("listaPacientes").value;

  const fecha =
    document.getElementById("fecha").value;

  const hora =
    document.getElementById("hora").value;

  const evolucion =
    document.getElementById("evolucion").value.trim();

  const plan =
    document.getElementById("plan").value.trim();

  /* VALIDAR CAMPOS */
  if (
    !idPaciente ||
    !fecha ||
    !hora ||
    !evolucion ||
    !plan
  ) {

    alert("Completa todos los datos.");

    return;
  }

  let consultas = obtenerConsultas();

  /* =========================
     EDITAR CONSULTA
  ========================= */
  if (consultaEditandoId !== null) {

    consultas = consultas.map((consulta) => {

      if (consulta.id == consultaEditandoId) {

        return {
          ...consulta,
          fecha,
          hora,
          evolucion,
          plan
        };
      }

      return consulta;
    });

    guardarConsultas(consultas);

    consultaEditandoId = null;

    document.getElementById(
      "btnGuardarConsulta"
    ).textContent = "Guardar consulta";

    limpiarFormularioConsulta();

    mostrarHistorial();

    alert("Consulta actualizada correctamente.");

    return;
  }

  /* =========================
     NUEVA CONSULTA
  ========================= */
  const nuevaConsulta = {

    id: Date.now(),

    idPaciente: Number(idPaciente),

    fecha,

    hora,

    evolucion,

    plan,

    nutriologo: obtenerSesion()
  };

  consultas.push(nuevaConsulta);

  guardarConsultas(consultas);

  limpiarFormularioConsulta();

  mostrarHistorial();

  alert("Consulta guardada correctamente.");
}

/* =========================
   MOSTRAR HISTORIAL
========================= */
export function mostrarHistorial() {

  const idPaciente =
    document.getElementById("listaPacientes").value;

  const datosPaciente =
    document.getElementById("datosPaciente");

  const historialConsultas =
    document.getElementById("historialConsultas");

  datosPaciente.innerHTML = "";

  historialConsultas.innerHTML = "";

  if (!idPaciente) {
    return;
  }

  const paciente =
    obtenerPacientePorId(idPaciente);

  if (!paciente) {
    return;
  }

  /* DATOS PACIENTE */
  datosPaciente.innerHTML = `
    <p><strong>Paciente:</strong>
    ${paciente.nombre}</p>

    <p><strong>Edad:</strong>
    ${paciente.edad} años</p>

    <p><strong>Peso:</strong>
    ${paciente.peso} kg</p>

    <p><strong>Altura:</strong>
    ${paciente.altura} m</p>

    <p><strong>IMC:</strong>
    ${paciente.imc}</p>

    <p class="diagnostico">
      <strong>Diagnóstico:</strong>
      ${paciente.diagnostico}
    </p>
  `;

  const consultas = obtenerConsultas();

  const consultasPaciente = consultas
    .filter(
      (consulta) =>
        consulta.idPaciente == idPaciente
    )
    .sort((a, b) => {

      const fechaA =
        new Date(`${a.fecha}T${a.hora}`);

      const fechaB =
        new Date(`${b.fecha}T${b.hora}`);

      return fechaB - fechaA;
    });

  /* SIN CONSULTAS */
  if (consultasPaciente.length === 0) {

    historialConsultas.innerHTML =
      "<p>No hay consultas registradas.</p>";

    return;
  }

  /* MOSTRAR CONSULTAS */
  consultasPaciente.forEach((consulta) => {

    const div = document.createElement("div");

    div.classList.add("consulta");

    div.innerHTML = `
      <p><strong>Fecha:</strong>
      ${consulta.fecha}</p>

      <p><strong>Hora:</strong>
      ${consulta.hora}</p>

      <p><strong>Nutriólogo:</strong>
      ${consulta.nutriologo}</p>

      <p><strong>Evolución:</strong>
      ${consulta.evolucion}</p>

      <p><strong>Plan de alimentación:</strong>
      ${consulta.plan}</p>

      <button onclick="editarConsulta(${consulta.id})">
        Editar
      </button>

      <button
        class="btn-eliminar"
        onclick="eliminarConsulta(${consulta.id})"
      >
        Eliminar
      </button>
    `;

    historialConsultas.appendChild(div);
  });
}

/* =========================
   EDITAR CONSULTA
========================= */
export function editarConsulta(id) {

  const consultas =
    obtenerConsultas();

  const consulta = consultas.find(
    (consulta) => consulta.id == id
  );

  if (!consulta) {

    alert("No se encontró la consulta.");

    return;
  }

  document.getElementById("fecha").value =
    consulta.fecha;

  document.getElementById("hora").value =
    consulta.hora;

  document.getElementById("evolucion").value =
    consulta.evolucion;

  document.getElementById("plan").value =
    consulta.plan;

  consultaEditandoId = consulta.id;

  document.getElementById(
    "btnGuardarConsulta"
  ).textContent = "Guardar cambios";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================
   ELIMINAR CONSULTA
========================= */
export function eliminarConsulta(id) {

  const confirmar = confirm(
    "¿Deseas eliminar esta consulta?"
  );

  if (!confirmar) {
    return;
  }

  let consultas =
    obtenerConsultas();

  consultas = consultas.filter(
    (consulta) => consulta.id != id
  );

  guardarConsultas(consultas);

  mostrarHistorial();

  alert("Consulta eliminada correctamente.");
}

/* =========================
   LIMPIAR FORMULARIO
========================= */
function limpiarFormularioConsulta() {

  document.getElementById("evolucion").value = "";

  document.getElementById("plan").value = "";

  colocarFechaHoraActual();
}

/* =========================
   FUNCIONES GLOBALES
========================= */
window.editarConsulta = editarConsulta;

window.eliminarConsulta = eliminarConsulta;