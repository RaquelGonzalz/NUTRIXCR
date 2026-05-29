import { obtenerPacientes, guardarPacientes } from "./storage.js";

/* =========================
   CALCULAR IMC
========================= */
export function calcularIMC(peso, altura) {

  return peso / (altura * altura);
}

/* =========================
   DIAGNÓSTICO
========================= */
export function obtenerDiagnostico(imc) {

  if (imc < 18.5) {

    return "Bajo peso";

  } else if (imc >= 18.5 && imc < 25) {

    return "Peso normal";

  } else if (imc >= 25 && imc < 30) {

    return "Sobrepeso";

  } else {

    return "Obesidad";
  }
}

/* =========================
   REGISTRAR PACIENTE
========================= */
export function registrarPaciente() {

  const nombre =
    document
      .getElementById("nombrePaciente")
      .value
      .trim();

  const edad =
    document
      .getElementById("edad")
      .value;

  const peso =
    parseFloat(
      document.getElementById("peso").value
    );

  const altura =
    parseFloat(
      document.getElementById("altura").value
    );

  /* VALIDACIÓN */
  if (
    !nombre ||
    !edad ||
    isNaN(peso) ||
    isNaN(altura)
  ) {
    return;
  }

  if (peso <= 0 || altura <= 0) {
    return;
  }

  const pacientes = obtenerPacientes();

  /* EVITAR DUPLICADOS */
  const existePaciente = pacientes.some(
    (paciente) =>
      paciente.nombre.toLowerCase() ===
      nombre.toLowerCase()
  );

  if (existePaciente) {
    return;
  }

  /* CALCULAR IMC */
  const imc = calcularIMC(peso, altura);

  const diagnostico =
    obtenerDiagnostico(imc);

  /* NUEVO PACIENTE */
  const nuevoPaciente = {

    id: Date.now(),

    nombre,

    edad,

    peso,

    altura,

    imc: imc.toFixed(2),

    diagnostico
  };

  pacientes.push(nuevoPaciente);

  guardarPacientes(pacientes);

  limpiarFormularioPaciente();

  cargarPacientes();
}

/* =========================
   CARGAR PACIENTES
========================= */
export function cargarPacientes() {

  const pacientes = obtenerPacientes();

  const listaPacientes =
    document.getElementById("listaPacientes");

  listaPacientes.innerHTML = `
    <option value="">
      Selecciona un paciente
    </option>
  `;

  pacientes.forEach((paciente) => {

    const option =
      document.createElement("option");

    option.value = paciente.id;

    option.textContent = paciente.nombre;

    listaPacientes.appendChild(option);
  });
}

/* =========================
   OBTENER PACIENTE
========================= */
export function obtenerPacientePorId(id) {

  const pacientes = obtenerPacientes();

  return pacientes.find(
    (paciente) => paciente.id == id
  );
}

/* =========================
   LIMPIAR FORMULARIO
========================= */
function limpiarFormularioPaciente() {

  document.getElementById(
    "nombrePaciente"
  ).value = "";

  document.getElementById(
    "edad"
  ).value = "";

  document.getElementById(
    "peso"
  ).value = "";

  document.getElementById(
    "altura"
  ).value = "";
}