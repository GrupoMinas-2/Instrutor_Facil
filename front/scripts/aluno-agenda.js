(function () {
  const { instructors } = window.AutoAulaData;

  // Funções auxiliares
  function formatBRL(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }

  function statusBadge(status) {
    const badges = {
      scheduled: '<span class="badge badge--scheduled">Agendada</span>',
      completed: '<span class="badge badge--completed">Concluída</span>',
      cancelled: '<span class="badge badge--cancelled">Cancelada</span>'
    };
    return badges[status] || '';
  }

  function renderActions(lesson) {
    if (lesson.status === 'scheduled') {
      return '<button class="btn btn--sm btn--outline">Editar</button><button class="btn btn--sm btn--danger">Cancelar</button>';
    }
    if (lesson.status === 'completed') {
      return '<button class="btn btn--sm btn--primary">Avaliar</button>';
    }
    return '';
  }

  // Dados mock para agenda
  const mockLessons = {
    scheduled: [
      {
        date: '2023-10-15',
        time: '14:00',
        duration: 1,
        pickupLocation: 'Centro, São Paulo',
        type: 'Prática B',
        price: 80,
        status: 'scheduled',
        instructor: instructors[0]
      },
      {
        date: '2023-10-20',
        time: '10:00',
        duration: 1,
        pickupLocation: 'Zona Sul, São Paulo',
        type: 'Prática B',
        price: 80,
        status: 'scheduled',
        instructor: instructors[1]
      }
    ],
    completed: [
      {
        date: '2023-09-10',
        time: '14:00',
        duration: 1,
        pickupLocation: 'Centro, São Paulo',
        type: 'Prática B',
        price: 80,
        status: 'completed',
        instructor: instructors[2]
      },
      {
        date: '2023-09-05',
        time: '10:00',
        duration: 1,
        pickupLocation: 'Zona Oeste, São Paulo',
        type: 'Prática B',
        price: 80,
        status: 'completed',
        instructor: instructors[3]
      }
    ]
  };

  // Função para renderizar cards de aulas
  function renderLessons(lessons, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = lessons.map((l) => {
      const date = new Date(`${l.date}T${l.time}`);
      const d = date.getDate();
      const monthShort = date.toLocaleDateString('pt-BR', { month: 'short' });
      const inst = l.instructor;
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
    }).join("");
  }

  // Renderiza aulas agendadas e concluídas
  renderLessons(mockLessons.scheduled, 'scheduled-grid');
  renderLessons(mockLessons.completed, 'completed-grid');

  // Lógica das abas
  const tabs = document.querySelectorAll('.agenda__tab');
  const contents = document.querySelectorAll('.agenda__tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active de todas as abas
      tabs.forEach(t => t.classList.remove('agenda__tab--active'));
      contents.forEach(c => c.classList.remove('agenda__tab-content--active'));

      // Adiciona active na aba clicada
      tab.classList.add('agenda__tab--active');
      const tabId = tab.dataset.tab;
      document.getElementById(tabId).classList.add('agenda__tab-content--active');
    });
  });
})();