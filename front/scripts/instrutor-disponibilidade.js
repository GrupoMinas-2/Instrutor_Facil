(function () {
  const { availability, formatDateBR, showToast } = window.AutoAulaData;
  const WEEK = ["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"];
  const SHORT = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
  const state = JSON.parse(JSON.stringify(availability));

  // Days
  const daysEl = document.getElementById("days");
  function renderDays() {
    daysEl.innerHTML = WEEK.map((d, i) => `
      <label class="day-pill ${state.workingDays[d] ? "is-on" : ""}">
        <input type="checkbox" data-day="${d}" ${state.workingDays[d] ? "checked" : ""} />
        <span>${SHORT[i]}</span>
      </label>
    `).join("");
  }
  renderDays();
  daysEl.addEventListener("change", (e) => {
    const d = e.target.dataset.day;
    state.workingDays[d] = e.target.checked;
    renderDays();
  });

  // Hours
  document.getElementById("hStart").value = state.workingHours.start;
  document.getElementById("hEnd").value = state.workingHours.end;

  // Lunch
  const lunchToggle = document.getElementById("lunchEnabled");
  const lunchTimes = document.getElementById("lunch-times");
  const lStart = document.getElementById("lStart");
  const lEnd = document.getElementById("lEnd");
  lunchToggle.checked = state.lunchBreak.enabled;
  lStart.value = state.lunchBreak.start;
  lEnd.value = state.lunchBreak.end;
  function updateLunch() {
    lunchTimes.classList.toggle("is-disabled", !lunchToggle.checked);
  }
  updateLunch();
  lunchToggle.addEventListener("change", updateLunch);

  // Rules
  document.getElementById("notice").value = state.minNoticeHours;
  document.getElementById("advance").value = state.maxAdvanceDays;

  // Blocked dates
  const blockList = document.getElementById("blockList");
  function renderBlocks() {
    blockList.innerHTML = state.blockedDates.length === 0
      ? `<span style="color:var(--color-text-soft);font-size:0.85rem">Nenhuma data bloqueada.</span>`
      : state.blockedDates.map((d) => `
        <span class="block-chip">${formatDateBR(d)} <button type="button" data-rm="${d}">×</button></span>
      `).join("");
  }
  renderBlocks();

  document.getElementById("addBlock").addEventListener("click", () => {
    const v = document.getElementById("blockDate").value;
    if (!v || state.blockedDates.includes(v)) return;
    state.blockedDates.push(v);
    state.blockedDates.sort();
    renderBlocks();
  });
  blockList.addEventListener("click", (e) => {
    const v = e.target.dataset.rm;
    if (!v) return;
    state.blockedDates = state.blockedDates.filter((x) => x !== v);
    renderBlocks();
  });

  document.getElementById("avail-form").addEventListener("submit", (e) => {
    e.preventDefault();
    state.workingHours.start = document.getElementById("hStart").value;
    state.workingHours.end = document.getElementById("hEnd").value;
    state.lunchBreak.enabled = lunchToggle.checked;
    state.lunchBreak.start = lStart.value;
    state.lunchBreak.end = lEnd.value;
    state.minNoticeHours = +document.getElementById("notice").value || 0;
    state.maxAdvanceDays = +document.getElementById("advance").value || 0;
    showToast("Disponibilidade salva!");
  });
})();
