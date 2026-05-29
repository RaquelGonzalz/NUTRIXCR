export function obtenerPacientes() {
  return JSON.parse(localStorage.getItem("pacientes")) || [];
}

export function guardarPacientes(pacientes) {
  localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

export function obtenerConsultas() {
  return JSON.parse(localStorage.getItem("consultas")) || [];
}

export function guardarConsultas(consultas) {
  localStorage.setItem("consultas", JSON.stringify(consultas));
}

export function guardarSesion(nombre) {
  sessionStorage.setItem("nutriologoActivo", nombre);
}

export function obtenerSesion() {
  return sessionStorage.getItem("nutriologoActivo");
}

export function cerrarSesionStorage() {
  sessionStorage.removeItem("nutriologoActivo");
}
