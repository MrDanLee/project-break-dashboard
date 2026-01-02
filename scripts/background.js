const backgrounds = [
  "https://cdn.esahubble.org/archives/images/screen/opo0006a.jpg",
  "https://cdn.esahubble.org/archives/images/screen/heic0206c.jpg",
  "https://cdn.esahubble.org/archives/images/screen/potw1921a.jpg",
  "https://cdn.esahubble.org/archives/images/screen/potw2006a.jpg"
];

let index = 0;
const overlay = document.getElementById("bg-overlay");

function changeBackground() {
  overlay.style.backgroundImage = `url('${backgrounds[index]}')`;
  overlay.style.opacity = 1;

  setTimeout(() => {
    document.body.style.backgroundImage = `url('${backgrounds[index]}')`;
    overlay.style.opacity = 0;
    index = (index + 1) % backgrounds.length;
  }, 1500);
}

changeBackground();
setInterval(changeBackground, 20000);
