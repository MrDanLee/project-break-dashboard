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
