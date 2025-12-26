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
