(function () {
  const { pricing, formatBRL, showToast } = window.AutoAulaData;
  const state = JSON.parse(JSON.stringify(pricing));

  document.getElementById("basePrice").value = state.basePricePerHour;
  document.getElementById("weekend").value = state.weekendSurcharge;
  document.getElementById("night").value = state.nightSurcharge;
  document.getElementById("cancel-policy").value = state.cancellationPolicy;

  const pkgList = document.getElementById("packages");
  const preview = document.getElementById("packages-preview");

  function renderPackages() {
    pkgList.innerHTML = state.packages.map((p, idx) => `
      <div class="package-row">
        <div class="field">
          <label class="field__label">Quantidade de aulas</label>
          <input type="number" min="2" data-pkg="lessons" data-i="${idx}" value="${p.lessons}" />
        </div>
        <div class="field">
          <label class="field__label">Desconto (%)</label>
          <input type="number" min="0" max="50" data-pkg="discount" data-i="${idx}" value="${p.discount}" />
        </div>
        <button type="button" data-remove="${idx}">Remover</button>
      </div>
    `).join("") + `<button type="button" class="add-row" id="add-pkg">+ Adicionar pacote</button>`;

    preview.innerHTML = `<strong>Pré-visualização:</strong>` + state.packages.map((p) => {
      const total = state.basePricePerHour * p.lessons;
      const final = total * (1 - p.discount / 100);
      return `<div class="preview-line"><span>${p.lessons} aulas</span><strong>${formatBRL(final)} (-${p.discount}%)</strong></div>`;
    }).join("");
  }
  renderPackages();

  pkgList.addEventListener("input", (e) => {
    const i = +e.target.dataset.i;
    const f = e.target.dataset.pkg;
    if (f && !isNaN(i)) {
      state.packages[i][f] = +e.target.value || 0;
      renderPackages();
    }
  });
  pkgList.addEventListener("click", (e) => {
    if (e.target.id === "add-pkg") {
      state.packages.push({ lessons: 5, discount: 5 });
      renderPackages();
    }
    if (e.target.dataset.remove !== undefined) {
      state.packages.splice(+e.target.dataset.remove, 1);
      renderPackages();
    }
  });

  document.getElementById("basePrice").addEventListener("input", (e) => {
    state.basePricePerHour = +e.target.value || 0;
    renderPackages();
  });

  document.getElementById("pricing-form").addEventListener("submit", (e) => {
    e.preventDefault();
    state.weekendSurcharge = +document.getElementById("weekend").value || 0;
    state.nightSurcharge = +document.getElementById("night").value || 0;
    state.cancellationPolicy = document.getElementById("cancel-policy").value;
    showToast("Preços atualizados com sucesso!");
  });
})();
