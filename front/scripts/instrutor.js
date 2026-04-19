(function () {
  const { profile, lessons, reviews, formatBRL, formatDateBR } = window.AutoAulaData;

  document.getElementById("greet-name").textContent = profile.name.split(" ")[0];

  const today = new Date().toISOString().slice(0, 10);

  // KPIs
  const todayCount = lessons.filter((l) => l.date === today && l.status !== "cancelada").length;
  const completed = lessons.filter((l) => l.status === "concluida");
  const revenue = completed.reduce((s, l) => s + l.price, 0);
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const pending = lessons.filter((l) => l.status === "pendente").length;

  document.getElementById("kpi-today").textContent = todayCount;
  document.getElementById("kpi-revenue").textContent = formatBRL(revenue);
  document.getElementById("kpi-rating").textContent = `${avg.toFixed(1)} ★`;
  document.getElementById("kpi-rating-hint").textContent = `${reviews.length} avaliações`;
  document.getElementById("kpi-pending").textContent = pending;

  // Próximas (3 mais próximas, não canceladas/concluídas)
  const upcoming = lessons
    .filter((l) => l.date >= today && (l.status === "confirmada" || l.status === "pendente"))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 4);

  document.getElementById("upcoming-list").innerHTML = upcoming.length === 0
    ? `<p style="color:var(--color-text-muted);text-align:center;padding:2rem">Nenhuma aula agendada</p>`
    : upcoming.map((l) => `
      <div class="lesson-row">
        <div class="lesson-time">
          <strong>${l.time}</strong>
          <span>${formatDateBR(l.date)}</span>
        </div>
        <div class="lesson-info">
          <strong>${l.studentName}</strong>
          <span>${l.type} · ${l.duration}h · ${l.pickupLocation}</span>
        </div>
        <div class="lesson-actions">
          <span class="badge badge--${l.status === "confirmada" ? "success" : "warning"}">${l.status}</span>
        </div>
      </div>
    `).join("");
})();
