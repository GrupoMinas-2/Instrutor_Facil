(function () {
  const { profile, showToast } = window.AutoAulaData;
  const state = JSON.parse(JSON.stringify(profile));

  // Pré-preenche
  document.getElementById("p-photo").src = state.photo;
  document.getElementById("p-photo").alt = state.name;
  document.getElementById("p-name-display").textContent = state.name;
  document.getElementById("p-loc-display").textContent = `${state.location} · ${state.experience} anos de experiência`;
  document.getElementById("p-name").value = state.name;
  document.getElementById("p-exp").value = state.experience;
  document.getElementById("p-email").value = state.email;
  document.getElementById("p-phone").value = state.phone;
  document.getElementById("p-bio").value = state.bio;
  document.getElementById("p-car").value = state.carModel;
  document.getElementById("p-plate").value = state.carPlate;
  document.getElementById("p-loc").value = state.location;
  document.getElementById("p-radius").value = state.serviceRadius;

  // Bio counter
  const bio = document.getElementById("p-bio");
  const bioCount = document.getElementById("bio-count");
  function updateBio() { bioCount.textContent = `${bio.value.length}/280`; }
  bio.addEventListener("input", updateBio);
  updateBio();

  // Categorias
  document.querySelectorAll('#cats input[type="checkbox"]').forEach((cb) => {
    cb.checked = state.categories.includes(cb.value);
  });

  // Tags
  const tagsList = document.getElementById("tags-list");
  function renderTags() {
    tagsList.innerHTML = state.specialties.map((s, i) => `
      <span class="tag">${s} <button type="button" data-rm="${i}">×</button></span>
    `).join("");
  }
  renderTags();
  tagsList.addEventListener("click", (e) => {
    const i = e.target.dataset.rm;
    if (i === undefined) return;
    state.specialties.splice(+i, 1);
    renderTags();
  });
  document.getElementById("tag-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      state.specialties.push(e.target.value.trim());
      e.target.value = "";
      renderTags();
    }
  });

  document.getElementById("profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    state.name = document.getElementById("p-name").value;
    state.experience = +document.getElementById("p-exp").value;
    state.email = document.getElementById("p-email").value;
    state.phone = document.getElementById("p-phone").value;
    state.bio = document.getElementById("p-bio").value;
    state.carModel = document.getElementById("p-car").value;
    state.carPlate = document.getElementById("p-plate").value;
    state.location = document.getElementById("p-loc").value;
    state.serviceRadius = +document.getElementById("p-radius").value;
    state.categories = Array.from(document.querySelectorAll('#cats input:checked')).map((c) => c.value);

    document.getElementById("p-name-display").textContent = state.name;
    document.getElementById("p-loc-display").textContent = `${state.location} · ${state.experience} anos de experiência`;
    showToast("Perfil atualizado!");
  });
})();
