/* ============================================
   ALUNO — AGENDA
   Renderiza aulas agendadas e concluídas do aluno
   ============================================ */

(function () {
  const { studentLessons, instructors, formatBRL, formatDateBR, showToast } =
    window.AutoAulaData;

  const list = document.getElementById("agenda-list");
  const tabs = document.getElementById("agenda-tabs");
  const summary = document.getElementById("agenda-summary");
  const countUpcoming = document.getElementById("count-upcoming");
  const countCompleted = document.getElementById("count-completed");

  const today = new Date().toISOString().slice(0, 10);
  let activeTab = "upcoming";

  // Cópia local (mock — alterações apenas em memória)
  const items = studentLessons.map((l) => ({ ...l }));
  const instructorById = Object.fromEntries(instructors.map((i) => [i.id, i]));

  const MONTHS = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

  function isUpcoming(l) {
    return l.status === "confirmada" && l.date >= today;
  }
  function isCompleted(l) {
    return l.status === "concluida";
  }

  function renderSummary() {
    const upcoming = items.filter(isUpcoming);
    const completed = items.filter(isCompleted);
    const totalHours = completed.reduce((acc, l) => acc + l.duration, 0);
    const nextLesson = [...upcoming].sort((a, b) =>
      (a.date + a.time).localeCompare(b.date + b.time)
    )[0];

    const nextLabel = nextLesson
      ? `${formatDateBR(nextLesson.date)} às ${nextLesson.time}`
      : "Nenhuma agendada";

    summary.innerHTML = `
      <div class="summary-card">
        <div class="summary-card__icon">📅</div>
        <div>
          <div class="summary-card__label">Próxima aula</div>
          <div class="summary-card__value">${nextLabel}</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-card__icon">🚗</div>
        <div>
          <div class="summary-card__label">Aulas agendadas</div>
          <div class="summary-card__value">${upcoming.length}</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-card__icon summary-card__icon--accent">✅</div>
        <div>
          <div class="summary-card__label">Aulas concluídas</div>
          <div class="summary-card__value">${completed.length}</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-card__icon summary-card__icon--accent">⏱️</div>
        <div>
          <div class="summary-card__label">Horas dirigidas</div>
          <div class="summary-card__value">${totalHours}h</div>
        </div>
      </div>
    `;

    countUpcoming.textContent = upcoming.length;
    countCompleted.textContent = completed.length;
  }

  function statusBadge(status) {
    if (status === "confirmada") return `<span class="badge badge--success">Confirmada</span>`;
    if (status === "concluida")  return `<span class="badge badge--info">Concluída</span>`;
    if (status === "pendente")   return `<span class="badge badge--warning">Pendente</span>`;
    return `<span class="badge">${status}</span>`;
  }

  function renderActions(l) {
    if (l.status === "confirmada") {
      return `
        <button class="btn btn--ghost btn--sm" data-act="contact" data-id="${l.id}">Falar com instrutor</button>
        <button class="btn btn--danger btn--sm" data-act="cancel" data-id="${l.id}">Cancelar</button>
      `;
    }
    if (l.status === "concluida") {
      if (l.rated) {
        return `<span class="lesson-rated">Você avaliou ${"★".repeat(l.ratingGiven)}</span>`;
      }
      return `<button class="btn btn--primary btn--sm" data-act="rate" data-id="${l.id}">Avaliar aula</button>`;
    }
    return "";
  }

  function lessonCard(l) {
    const inst = instructorById[l.instructorId] || {};
    const [, m, d] = l.date.split("-");
    const monthShort = MONTHS[+m - 1] || "";

    return `
      <article class="student-lesson">
        <div class="student-lesson__date">
          <strong>${d}</strong>
          <span>${monthShort}</span>
        </div>
        <img class="student-lesson__avatar"
             src="${inst.photo || ''}"
             alt="Foto do instrutor ${inst.name || ''}" />
        <div class="student-lesson__body">
          <strong class="student-lesson__instructor">${inst.name || 'Instrutor'}</strong>
          <div class="student-lesson__rating">
            <strong>★ ${inst.rating ?? '—'}</strong>
            <span>· ${inst.car || ''}</span>
          </div>
          <div class="student-lesson__meta">
            <span>🕐 ${l.time} · ${l.duration}h</span>
            <span>📍 ${l.pickupLocation}</span>
            <span>🎯 ${l.type}</span>
            <span>💰 ${formatBRL(l.price)}</span>
            ${inst.location ? `<span>🗺️ ${inst.location}</span>` : ''}
          </div>
        </div>
        <div class="student-lesson__actions">
          ${statusBadge(l.status)}
          ${renderActions(l)}
        </div>
      </article>
    `;
  }

  function render() {
    const filtered = activeTab === "upcoming"
      ? items.filter(isUpcoming).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
      : items.filter(isCompleted).sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));

    if (filtered.length === 0) {
      list.innerHTML = activeTab === "upcoming"
        ? `<div class="empty-state">
             <strong>Você não tem aulas agendadas</strong>
             Que tal encontrar um instrutor e marcar sua próxima aula?
           </div>`
        : `<div class="empty-state">
             <strong>Nenhuma aula concluída ainda</strong>
             Suas aulas finalizadas aparecerão aqui.
           </div>`;
      return;
    }

    list.innerHTML = filtered.map(lessonCard).join("");
  }

  // ---- Eventos ----
  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    tabs.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    activeTab = btn.dataset.tab;
    render();
  });

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-act]");
    if (!btn) return;
    const item = items.find((x) => x.id === btn.dataset.id);
    if (!item) return;
    const inst = instructorById[item.instructorId] || {};

    if (btn.dataset.act === "cancel") {
      if (!confirm("Deseja realmente cancelar esta aula?")) return;
      const idx = items.indexOf(item);
      items.splice(idx, 1);
      showToast("Aula cancelada");
      renderSummary();
      render();
    } else if (btn.dataset.act === "rate") {
      item.rated = true;
      item.ratingGiven = 5;
      showToast(`Avaliação enviada para ${inst.name || 'o instrutor'}`);
      render();
    } else if (btn.dataset.act === "contact") {
      showToast(`Abrindo conversa com ${inst.name || 'o instrutor'}…`);
    }
  });

  // ---- Init ----
  renderSummary();
  render();
})();
