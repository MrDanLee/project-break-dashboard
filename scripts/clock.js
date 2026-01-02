import "./background.js";
console.log('funciona')

const clock = document.getElementById('clock'),
      date = document.getElementById('date')

function renderText (time) {
  const timeText = document.getElementById('time-text')
  const timeString = time

  if (timeString < "07:00:00" && timeString >= "00:01:00" ) {
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

function updateDateTime () {
  const now = new Date()

  const formatted = now.toLocaleString ('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })  
  clock.textContent = formatted
  renderText(formatted)
}

function updateDate () {
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