(function () {
  // Helper para renderizar cards de instrutores
  function renderInstructors(instructors) {
    const grid = document.getElementById("featured-grid");
    if (!grid) return;
    
    const top = [...instructors].sort((a, b) => b.rating - a.rating).slice(0, 12);

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
  }

  // Carrega instrutores do servidor
  async function loadInstructors() {
    try {
      const instructorList = await window.searchInstructors();
      
      if (Array.isArray(instructorList) && instructorList.length > 0) {
        renderInstructors(instructorList);
        return;
      }
    } catch (error) {
      console.error('Erro ao carregar instrutores do servidor:', error);
    }
    
    // Fallback: usar dados mockados
    console.warn('Usando dados mockados como fallback');
    const { instructors } = window.AutoAulaData;
    renderInstructors(instructors);
  }

  // Carregar instrutores ao iniciar
  loadInstructors();

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
