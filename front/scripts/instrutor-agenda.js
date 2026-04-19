(function () {
  const { lessons, formatDateBR, formatBRL, showToast } = window.AutoAulaData;
  const list = document.getElementById("lesson-list");
  const tabs = document.getElementById("lesson-tabs");

  const today = new Date().toISOString().slice(0, 10);
  let activeTab = "upcoming";
  // Cópia local (mock — alterações apenas em memória)
  const items = lessons.map((l) => ({ ...l }));

  function filtered() {
    if (activeTab === "upcoming") {
      return items.filter((l) => l.date >= today && l.status === "confirmada");
    }
    if (activeTab === "pending") {
      return items.filter((l) => l.status === "pendente");
    }
    return items.filter((l) => l.status === "concluida" || l.status === "cancelada" || l.date < today);
  }

  function statusBadge(s) {
    const map = {
      confirmada: "success",
      pendente: "warning",
      concluida: "info",
      cancelada: "danger",
    };
    return `<span class="badge badge--${map[s]}">${s}</span>`;
  }

  function actions(l) {
    if (l.status === "pendente") {
      return `
        <button class="btn btn--success btn--sm" data-act="confirm" data-id="${l.id}">Confirmar</button>
        <button class="btn btn--danger btn--sm" data-act="cancel" data-id="${l.id}">Recusar</button>
      `;
    }
    if (l.status === "confirmada" && l.date <= today) {
      return `<button class="btn btn--primary btn--sm" data-act="complete" data-id="${l.id}">Marcar concluída</button>`;
    }
    if (l.status === "confirmada") {
      return `<button class="btn btn--danger btn--sm" data-act="cancel" data-id="${l.id}">Cancelar</button>`;
    }
    return "";
  }

  function render() {
    const list2 = filtered().sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));
    if (list2.length === 0) {
      list.innerHTML = `<div class="empty-state">Nenhuma aula nesta categoria.</div>`;
      return;
    }
    list.innerHTML = list2.map((l) => {
      const [, m, d] = l.date.split("-");
      const monthShort = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"][+m - 1];
      return `
        <article class="lesson-card">
          <div class="lesson-card__date">
            <strong>${d}</strong>
            <span>${monthShort}</span>
          </div>
          <div class="lesson-card__body">
            <strong>${l.studentName}</strong>
            <div class="lesson-card__meta">
              <span>🕐 ${l.time} · ${l.duration}h</span>
              <span>📍 ${l.pickupLocation}</span>
              <span>🎯 ${l.type}</span>
              <span>💰 ${formatBRL(l.price)}</span>
              <span>📞 ${l.studentPhone}</span>
            </div>
          </div>
          <div class="lesson-card__actions">
            ${statusBadge(l.status)}
            ${actions(l)}
          </div>
        </article>
      `;
    }).join("");
  }

  tabs.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    tabs.querySelectorAll("button").forEach((x) => x.classList.remove("is-active"));
    b.classList.add("is-active");
    activeTab = b.dataset.tab;
    render();
  });

  list.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-act]");
    if (!b) return;
    const item = items.find((x) => x.id === b.dataset.id);
    if (!item) return;
    const map = { confirm: "confirmada", cancel: "cancelada", complete: "concluida" };
    item.status = map[b.dataset.act];
    showToast(`Aula ${item.status}`);
    render();
  });

  render();
})();
