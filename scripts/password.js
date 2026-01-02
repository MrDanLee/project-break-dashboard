import "./background.js";
document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generate");
  const result = document.getElementById("result");
  

  function generarContrasena({
    longitud = 12,
    mayusculas = true,
    minusculas = true,
    numeros = true,
    simbolos = true
  } = {}) {
    let chars = "";
    if (mayusculas) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (minusculas) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numeros) chars += "0123456789";
    if (simbolos) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) return "Selecciona al menos una opción";

    let password = "";
    for (let i = 0; i < longitud; i++) {
      const index = Math.floor(Math.random() * chars.length);
      password += chars[index];
    }

    return password;
  }

  generateButton.addEventListener("click", () => {
    console.log("funciona");

    const password = generarContrasena({
      longitud: Number(document.getElementById("length").value),
      mayusculas: document.getElementById("uppercase").checked,
      minusculas: document.getElementById("lowercase").checked,
      numeros: document.getElementById("numbers").checked,
      simbolos: document.getElementById("symbols").checked
    });

    result.textContent = password;
  });
});
