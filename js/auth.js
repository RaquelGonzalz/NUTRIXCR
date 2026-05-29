import { guardarSesion } from "./storage.js";

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", iniciarSesion);

document.getElementById("nombreNutriologo").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    iniciarSesion();
  }
});

function iniciarSesion() {
  const nombre = document.getElementById("nombreNutriologo").value.trim();

  if (nombre === "") {
    alert("Ingresa el nombre del nutriólogo.");
    return;
  }

  guardarSesion(nombre);
  window.location.href = "panel.html";
}
