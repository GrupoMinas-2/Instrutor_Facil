(function () {
  const grid = document.getElementById("results-grid");
  const empty = document.getElementById("results-empty");
  const count = document.getElementById("results-count");

  const state = {
    location: "",
    cats: new Set(),
    maxPrice: 100,
    minRating: 0,
    sort: "rating",
    instructors: [],
  };

  // Pré-preenche filtros via querystring (vindo do hero)
  const qs = new URLSearchParams(window.location.search);
  if (qs.get("local")) {
    state.location = qs.get("local");
    document.getElementById("f-location").value = state.location;
  }
  if (qs.get("cat")) {
    const c = qs.get("cat");
    state.cats.add(c);
    const cb = document.querySelector(`input[data-filter="cat"][value="${c}"]`);
    if (cb) cb.checked = true;
  }

  function render() {
    const list = state.instructors.filter((i) => {
      if (state.location && !i.location.toLowerCase().includes(state.location.toLowerCase())) return false;
      if (state.cats.size > 0 && !i.categories.some((c) => state.cats.has(c))) return false;
      if (i.pricePerHour > state.maxPrice) return false;
      if (i.rating < state.minRating) return false;
      return true;
    });

    list.sort((a, b) => {
      switch (state.sort) {
        case "price-asc": return a.pricePerHour - b.pricePerHour;
        case "price-desc": return b.pricePerHour - a.pricePerHour;
        case "exp": return b.experience - a.experience;
        default: return b.rating - a.rating;
      }
    });

    count.textContent = `${list.length} instrutor${list.length !== 1 ? "es" : ""} encontrado${list.length !== 1 ? "s" : ""}`;
    empty.hidden = list.length > 0;

    grid.innerHTML = list.map((i) => `
      <article class="instructor-card">
        <img class="instructor-card__img" src="${i.photo}" alt="${i.name}" />
        <div class="instructor-card__body">
          <h3 class="instructor-card__name">${i.name}</h3>
          <div class="instructor-card__rating">
            <strong>★ ${i.rating}</strong>
            <span>(${i.reviews})</span>
            <span>· ${i.experience} anos</span>
          </div>
          <div class="instructor-card__loc">📍 ${i.location}</div>
          <div class="instructor-card__tags">
            ${i.categories.map((c) => `<span class="instructor-card__tag">CNH ${c}</span>`).join("")}
            ${i.specialties.slice(0, 1).map((s) => `<span class="instructor-card__tag">${s}</span>`).join("")}
          </div>
          <div class="instructor-card__footer">
            <div class="instructor-card__price">
              <strong>R$ ${i.pricePerHour}</strong>
              <span>/ hora</span>
            </div>
            <a href="agendamento.html?id=${i.id}" class="btn btn--primary btn--sm">Agendar</a>
          </div>
        </div>
      </article>
    `).join("");
  }

  async function loadInstructors() {
    try {
      const instructors = await window.searchInstructors();
      if (Array.isArray(instructors) && instructors.length > 0) {
        state.instructors = instructors;
      } else {
        console.warn('Nenhum instrutor retornado pelo servidor, usando fallback mock.');
        state.instructors = window.AutoAulaData?.instructors || [];
      }
    } catch (error) {
      console.error('Erro ao carregar instrutores do servidor:', error);
      state.instructors = window.AutoAulaData?.instructors || [];
    }

    render();
  }

  // Listeners
  document.getElementById("f-location").addEventListener("input", (e) => {
    state.location = e.target.value;
    render();
  });

  document.querySelectorAll('input[data-filter="cat"]').forEach((cb) => {
    cb.addEventListener("change", (e) => {
      if (e.target.checked) state.cats.add(e.target.value);
      else state.cats.delete(e.target.value);
      render();
    });
  });

  const priceEl = document.getElementById("f-price");
  const priceOut = document.getElementById("f-price-out");
  priceEl.addEventListener("input", (e) => {
    state.maxPrice = +e.target.value;
    priceOut.textContent = `R$ ${state.maxPrice}`;
    render();
  });

  document.getElementById("f-rating").querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll("#f-rating button").forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
      state.minRating = +b.dataset.r;
      render();
    });
  });

  document.getElementById("results-sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  document.getElementById("f-clear").addEventListener("click", () => {
    state.location = ""; state.cats.clear(); state.maxPrice = 100; state.minRating = 0;
    document.getElementById("f-location").value = "";
    document.querySelectorAll('input[data-filter="cat"]').forEach((cb) => (cb.checked = false));
    priceEl.value = 100; priceOut.textContent = "R$ 100";
    document.querySelectorAll("#f-rating button").forEach((x) => x.classList.remove("is-active"));
    document.querySelector('#f-rating button[data-r="0"]').classList.add("is-active");
    render();
  });

  loadInstructors();
})();
