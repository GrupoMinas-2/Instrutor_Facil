(function () {
  const { instructors } = window.AutoAulaData;

  // Renderiza instrutores em destaque (top 4 por avaliação)
  const grid = document.getElementById("featured-grid");
  const top = [...instructors].sort((a, b) => b.rating - a.rating).slice(0, 4);

  grid.innerHTML = top.map((i) => `
    <article class="instructor-card">
      <img class="instructor-card__img" src="${i.photo}" alt="Foto de ${i.name}" />
      <div class="instructor-card__body">
        <h3 class="instructor-card__name">${i.name}</h3>
        <div class="instructor-card__rating">
          <strong>★ ${i.rating}</strong>
          <span>(${i.reviews} avaliações)</span>
        </div>
        <div class="instructor-card__loc">📍 ${i.location}</div>
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

  // Busca do hero — redireciona para busca.html com query
  document.getElementById("hero-search").addEventListener("submit", (e) => {
    e.preventDefault();
    const loc = document.getElementById("search-location").value.trim();
    const cat = document.getElementById("search-category").value;
    const params = new URLSearchParams();
    if (loc) params.set("local", loc);
    if (cat) params.set("cat", cat);
    window.location.href = `busca.html${params.toString() ? "?" + params : ""}`;
  });
})();
