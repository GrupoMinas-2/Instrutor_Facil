(function () {
  const { reviews, showToast } = window.AutoAulaData;
  const items = reviews.map(value => ({ ...value }));

  const avg = items.reduce((s, r) => s + r.rating, 0) / items.length;
  document.getElementById("avg-score").textContent = avg.toFixed(1);
  document.getElementById("avg-count").textContent = `${items.length} avaliações`;
  document.getElementById("avg-stars").textContent = "★".repeat(Math.round(avg)) + "☆".repeat(5 - Math.round(avg));

  // Distribuição
  const bars = document.getElementById("rating-bars");
  const dist = [5,4,3,2,1].map((n) => ({ n, count: items.filter((r) => r.rating === n).length }));
  bars.innerHTML = dist.map((d) => {
    const pct = (d.count / items.length) * 100 || 0;
    return `
      <div class="bar-row">
        <span>${d.n}★</span>
        <div class="bar"><div style="width:${pct}%"></div></div>
        <span style="text-align:right">${d.count}</span>
      </div>
    `;
  }).join("");

  // Lista
  const list = document.getElementById("reviews-list");
  let filter = "all";

  function filtered() {
    if (filter === "unanswered") return items.filter((r) => !r.reply);
    if (filter === "5") return items.filter((r) => r.rating === 5);
    if (filter === "lower") return items.filter((r) => r.rating <= 4);
    return items;
  }

  function render() {
    const arr = filtered();
    if (arr.length === 0) {
      list.innerHTML = `<div class="card" style="text-align:center;color:var(--color-text-muted)">Nenhuma avaliação nesse filtro.</div>`;
      return;
    }
    list.innerHTML = arr.map((r) => `
      <article class="review-item" data-id="${r.id}">
        <header class="review-item__head">
          <div class="review-item__author">
            <strong>${r.studentName}</strong>
            <span>${r.lessonType} · ${r.date}</span>
          </div>
          <div class="review-item__stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        </header>
        <p class="review-item__comment">${r.comment}</p>
        ${r.reply
          ? `<div class="review-item__reply"><strong>Sua resposta</strong>${r.reply}</div>`
          : `<form class="reply-form" data-id="${r.id}">
              <input type="text" placeholder="Escreva uma resposta pública..." required />
              <button type="submit" class="btn btn--primary btn--sm">Responder</button>
            </form>`
        }
      </article>
    `).join("");
  }
  render();

  document.getElementById("rev-tabs").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    document.querySelectorAll("#rev-tabs button").forEach((x) => x.classList.remove("is-active"));
    b.classList.add("is-active");
    filter = b.dataset.f;
    render();
  });

  list.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const id = f.dataset.id;
    const value = f.querySelector("input").value.trim();
    if (!value) return;
    const item = items.find((r) => r.id === id);
    if (item) {
      item.reply = value;
      showToast("Resposta publicada!");
      render();
    }
  });
})();
