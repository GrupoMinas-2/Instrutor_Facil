(function () {
  const { instructors, availability, lessons, formatBRL, formatDateBR, showToast } = window.AutoAulaData;

  // Pega instrutor da query
  const id = new URLSearchParams(location.search).get("id") || "i1";
  const instructor = instructors.find((i) => i.id === id) || instructors[0];

  // Estado
  const state = {
    step: 1,
    date: "",
    time: "",
    duration: 1,
    pickup: "",
  };

  // ---- Renderiza instrutor no resumo ----
  document.getElementById("summary-instructor").innerHTML = `
    <div class="summary__instructor">
      <img src="${instructor.photo}" alt="${instructor.name}" />
      <div>
        <strong>${instructor.name}</strong>
        <span>★ ${instructor.rating} · ${instructor.location}</span>
      </div>
    </div>
  `;
  document.getElementById("sum-rate").textContent = formatBRL(instructor.pricePerHour);

  // ---- Data padrão (amanhã) ----
  const dateInput = document.getElementById("s-date");
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 10);
  dateInput.min = minDate;
  dateInput.value = minDate;
  state.date = minDate;

  // ---- Renderiza horários disponíveis (respeita availability + reservas) ----
  function renderTimeSlots() {
    const grid = document.getElementById("time-grid");
    const [h0] = availability.workingHours.start.split(":").map(Number);
    const [h1] = availability.workingHours.end.split(":").map(Number);
    const lunchStart = availability.lunchBreak.enabled ? +availability.lunchBreak.start.split(":")[0] : -1;

    const reserved = new Set(
      lessons.filter((l) => l.date === state.date).map((l) => l.time)
    );

    const slots = [];
    for (let h = h0; h < h1; h++) {
      if (h === lunchStart) continue;
      slots.push(`${String(h).padStart(2, "0")}:00`);
    }

    grid.innerHTML = slots.map((t) => `
      <button data-time="${t}" ${reserved.has(t) ? "disabled" : ""}>${t}</button>
    `).join("");

    grid.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        grid.querySelectorAll("button").forEach((x) => x.classList.remove("is-selected"));
        b.classList.add("is-selected");
        state.time = b.dataset.time;
        updateSummary();
      });
    });
  }
  renderTimeSlots();

  dateInput.addEventListener("change", (e) => {
    state.date = e.target.value;
    state.time = "";
    renderTimeSlots();
    updateSummary();
  });

  document.getElementById("s-duration").addEventListener("change", (e) => {
    state.duration = +e.target.value;
    updateSummary();
  });
  document.getElementById("s-pickup").addEventListener("input", (e) => {
    state.pickup = e.target.value;
  });

  function updateSummary() {
    document.getElementById("sum-date").textContent = state.date ? formatDateBR(state.date) : "—";
    document.getElementById("sum-time").textContent = state.time || "—";
    document.getElementById("sum-duration").textContent = `${state.duration}h`;
    document.getElementById("sum-total").textContent = formatBRL(instructor.pricePerHour * state.duration);
  }
  updateSummary();

  // ---- Navegação entre etapas ----
  function goTo(step) {
    if (step === 2 && (!state.time || !state.pickup)) {
      showToast("Selecione horário e local de embarque");
      return;
    }
    if (step === 3 && !validateStep2()) return;

    document.querySelectorAll(".step-panel").forEach((p) => p.classList.remove("is-active"));
    document.querySelector(`[data-panel="${step}"]`).classList.add("is-active");

    document.querySelectorAll("#stepper li").forEach((li) => {
      const n = +li.dataset.step;
      li.classList.remove("is-active", "is-done");
      if (n < step) li.classList.add("is-done");
      else if (n === step) li.classList.add("is-active");
    });
    state.step = step;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-next]").forEach((b) =>
    b.addEventListener("click", () => goTo(+b.dataset.next))
  );
  document.querySelectorAll("[data-prev]").forEach((b) =>
    b.addEventListener("click", () => goTo(+b.dataset.prev))
  );

  // ---- Máscaras ----
  function mask(input, fn) {
    input.addEventListener("input", (e) => {
      const pos = e.target.selectionStart;
      e.target.value = fn(e.target.value);
      e.target.setSelectionRange(pos, pos);
    });
  }
  mask(document.getElementById("s-cpf"), (v) =>
    v.replace(/\D/g, "").slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
  );
  mask(document.getElementById("s-phone"), (v) =>
    v.replace(/\D/g, "").slice(0, 11)
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
  );
  mask(document.getElementById("cc-num"), (v) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ")
  );
  mask(document.getElementById("cc-exp"), (v) =>
    v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2")
  );
  mask(document.getElementById("cc-cvv"), (v) => v.replace(/\D/g, "").slice(0, 4));

  // ---- Validação etapa 2 ----
  function setError(id, msg) {
    const field = document.getElementById(id).closest(".field");
    field.classList.toggle("is-invalid", !!msg);
    field.querySelector(".field__error").textContent = msg || "";
  }
  function validateStep2() {
    let ok = true;
    const name = document.getElementById("s-name").value.trim();
    const cpf = document.getElementById("s-cpf").value.replace(/\D/g, "");
    const email = document.getElementById("s-email").value.trim();
    const phone = document.getElementById("s-phone").value.replace(/\D/g, "");

    if (name.length < 3) { setError("s-name", "Informe seu nome completo"); ok = false; } else setError("s-name");
    if (cpf.length !== 11) { setError("s-cpf", "CPF inválido"); ok = false; } else setError("s-cpf");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("s-email", "E-mail inválido"); ok = false; } else setError("s-email");
    if (phone.length < 10) { setError("s-phone", "Telefone inválido"); ok = false; } else setError("s-phone");

    return ok;
  }

  // ---- Tabs de pagamento ----
  document.querySelectorAll("[data-pay]").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll("[data-pay]").forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
      document.querySelectorAll("[data-pay-content]").forEach((c) => (c.hidden = c.dataset.payContent !== b.dataset.pay));
    });
  });

  // ---- Confirmar ----
  document.getElementById("confirm-booking").addEventListener("click", () => {
    const activePay = document.querySelector("[data-pay].is-active").dataset.pay;
    if (activePay === "card") {
      const num = document.getElementById("cc-num").value.replace(/\D/g, "");
      if (num.length < 13) {
        setError("cc-num", "Número do cartão inválido");
        return;
      }
      setError("cc-num");
    }
    // Marca último step como done e mostra sucesso
    document.querySelectorAll("#stepper li").forEach((li) => {
      li.classList.remove("is-active");
      li.classList.add("is-done");
    });
    document.querySelectorAll(".step-panel").forEach((p) => p.classList.remove("is-active"));
    document.querySelector('[data-panel="success"]').classList.add("is-active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Agendamento confirmado!");
  });
})();
