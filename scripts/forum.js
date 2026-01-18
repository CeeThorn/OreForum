const form = document.getElementById("character-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const character = {
    id: crypto.randomUUID(),
    name: formData.get("name"),
    age: formData.get("age"),
    gender: formData.get("gender"),
    height: formData.get("height"),
    birthday: formData.get("birthday"),
    background: formData.get("background"),
    relationship: formData.get("relationship"),
    abilities: formData.get("abilities"),
    createdAt: new Date().toISOString(),
  };


  const existing = JSON.parse(localStorage.getItem("characters")) || [];

  existing.push(character);

  localStorage.setItem("characters", JSON.stringify(existing));

 
  window.location.href = "index.html";
});
