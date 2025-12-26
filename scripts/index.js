// Links JS

const form = document.getElementById("link-form"),
  nameInput = document.getElementById("link-name"),
  urlInput = document.getElementById("link-url"),
  list = document.getElementById("links-list")

let links = JSON.parse(localStorage.getItem("links")) || [];

renderLinks();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const link = {
    id: Date.now(),
    name: nameInput.value,
    url: urlInput.value
  };

  links.push(link);
  saveLinks();
  renderLinks();

  form.reset();
});

function renderLinks() {
  list.innerHTML = "";

  links.forEach(link => {
    const li = document.createElement("li");
    li.className = "link-item";

    li.innerHTML = `
      <a href="${link.url}" target="_blank">${link.name}</a>
      <button data-id="${link.id}">✕</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      removeLink(link.id);
    });

    list.appendChild(li);
  });
}

function removeLink(id) {
  links = links.filter(link => link.id !== id);
  saveLinks();
  renderLinks();
}

function saveLinks() {
  localStorage.setItem("links", JSON.stringify(links));
}

// Clock JS

const clock = document.getElementById('clock'),
  date = document.getElementById('date')

function renderText(time) {
  const timeText = document.getElementById('time-text')
  const timeString = time

  if (timeString < "07:00:00" && timeString >= "00:01:00") {
    timeText.textContent = "Es hora de descansar. Apaga y sigue mañana"
  } else if (timeString < "12:00:00" && timeString >= "07:01:00") {
    timeText.textContent = "Buenos días, desayuna fuerte y a darle al código"
  } else if (timeString < "14:00:00" && timeString >= "12:01:00") {
    timeText.textContent = "Echa un rato más pero no olvides comer"
  } else if (timeString < "16:00:00" && timeString >= "14:01:00") {
    timeText.textContent = "Espero que hayas comido"
  } else if (timeString < "18:00:00" && timeString >= "16:01:00") {
    timeText.textContent = "Buenas tardes, el último empujón"
  } else if (timeString < "22:00:00" && timeString >= "18:01:00") {
    timeText.textContent = "Esto ya son horas extras, ... piensa en parar pronto"
  } else if (timeString < "00:00:00" && timeString >= "22:01:00") {
    timeText.textContent = "Buenas noches, es hora de pensar en parar y descansar"
  }
}

function updateDateTime() {
  const now = new Date()

  const formatted = now.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  clock.textContent = formatted
  renderText(formatted)
}

function updateDate() {
  const now = new Date()

  const formatted = now.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
  date.textContent = formatted
}

updateDateTime()
setInterval(updateDateTime, 1000)
updateDate()

// Weather JS

const apiKey = "4bc4e481b5bbec535f8c350ea310c137",
  city = "Madrid",
  display = document.getElementById("weather-display");

async function fetchWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`
    );
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data = await res.json();
    showWeather(data);
  } catch (error) {
    display.innerHTML = `<p style="color: #f87171;">No se pudo obtener el clima: ${error.message}</p>`;
  }
}

function showWeather(data) {
  const { name, sys, main, weather } = data;
  display.innerHTML = `
    <h3>${name}, ${sys.country}</h3>
    <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
    <p><strong>${Math.round(main.temp)}°C</strong> - ${weather[0].description}</p>
    <p>Máx: ${Math.round(main.temp_max)}°C | Mín: ${Math.round(main.temp_min)}°C</p>
  `;
}

fetchWeather(city);

// Password JS

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
