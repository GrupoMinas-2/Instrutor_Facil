// Get instructor ID from URL
const urlParams = new URLSearchParams(window.location.search);
const instructorId = urlParams.get('id');
let instructor = null;

// Booking state
let bookingData = {
  step: 1,
  selectedDate: '',
  selectedTime: '',
  numLessons: 1,
  paymentMethod: 'credit'
};

// Load booking page
document.addEventListener('DOMContentLoaded', function() {
  if (instructorId) {
    instructor = instructors.find(i => i.id === instructorId);
    if (instructor) {
      // Update back link
      document.getElementById('back-link').href = `instrutor.html?id=${instructorId}`;
      renderBooking();
    } else {
      document.getElementById('booking-content').innerHTML = '<p class="text-center text-gray-600">Instrutor não encontrado</p>';
    }
  }
});

// Render booking page
function renderBooking() {
  const total = instructor.pricePerHour * bookingData.numLessons;
  
  const bookingContent = document.getElementById('booking-content');
  bookingContent.innerHTML = `
    <div class="mb-10">
      <div class="flex items-center justify-center gap-4">
        ${[1, 2, 3].map(s => `
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold ${bookingData.step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}">
              ${s}
            </div>
            ${s < 3 ? `<div class="w-20 h-1 ${bookingData.step > s ? 'bg-blue-600' : 'bg-gray-200'}"></div>` : ''}
          </div>
        `).join('')}
      </div>
      <div class="flex justify-center gap-24 mt-2 text-sm text-gray-600">
        <span>Data e Hora</span>
        <span>Detalhes</span>
        <span>Pagamento</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div id="booking-form" class="bg-white rounded-xl shadow-sm p-6"></div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-sm p-6 sticky top-20">
          <h3 class="text-lg font-bold mb-4">Resumo</h3>

          <div class="flex items-center gap-3 mb-6 pb-6 border-b">
            <img src="${instructor.photo}" alt="${instructor.name}" class="w-16 h-16 rounded-lg object-cover" />
            <div>
              <div class="font-semibold">${instructor.name}</div>
              <div class="text-sm text-gray-600">${instructor.location}</div>
            </div>
          </div>

          <div class="space-y-3 mb-6 pb-6 border-b" id="booking-summary">
            ${bookingData.selectedDate ? `
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <div>
                  <div class="text-sm text-gray-600">Data</div>
                  <div class="font-semibold">${new Date(bookingData.selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')}</div>
                </div>
              </div>
            ` : ''}
            ${bookingData.selectedTime ? `
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <div class="text-sm text-gray-600">Horário</div>
                  <div class="font-semibold">${bookingData.selectedTime}</div>
                </div>
              </div>
            ` : ''}
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <div class="text-sm text-gray-600">Quantidade</div>
                <div class="font-semibold">${bookingData.numLessons} ${bookingData.numLessons === 1 ? 'aula' : 'aulas'}</div>
              </div>
            </div>
          </div>

          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">${bookingData.numLessons}x R$ ${instructor.pricePerHour}</span>
              <span>R$ ${total.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Taxa de serviço</span>
              <span>R$ 0,00</span>
            </div>
          </div>

          <div class="flex justify-between border-t pt-4">
            <span class="font-semibold">Total</span>
            <span class="text-2xl font-bold text-blue-600">R$ ${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  renderBookingStep();
}

// Render booking steps
function renderBookingStep() {
  const form = document.getElementById('booking-form');
  
  if (bookingData.step === 1) {
    form.innerHTML = `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold mb-6">Escolha data e horário</h2>

        <div>
          <label class="block text-sm font-semibold mb-2">Data da aula</label>
          <input
            type="date"
            id="date-input"
            value="${bookingData.selectedDate}"
            min="${new Date().toISOString().split('T')[0]}"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2">Horário</label>
          <div class="grid grid-cols-3 gap-3" id="time-buttons">
            ${['08:00', '10:00', '14:00', '16:00', '18:00'].map(time => `
              <button
                onclick="selectTime('${time}')"
                class="time-btn px-4 py-3 border-2 rounded-lg font-semibold ${bookingData.selectedTime === time ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 hover:border-blue-300'}"
              >
                ${time}
              </button>
            `).join('')}
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2">Número de aulas</label>
          <select
            id="lessons-select"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
          >
            ${[1, 2, 3, 4, 5, 10, 15, 20].map(n => `
              <option value="${n}" ${bookingData.numLessons === n ? 'selected' : ''}>
                ${n} ${n === 1 ? 'aula' : 'aulas'}
              </option>
            `).join('')}
          </select>
        </div>

        <button
          onclick="nextStep()"
          id="continue-btn"
          class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          ${!bookingData.selectedDate || !bookingData.selectedTime ? 'disabled' : ''}
        >
          Continuar
        </button>
      </div>
    `;
    
    document.getElementById('date-input').addEventListener('change', (e) => {
      bookingData.selectedDate = e.target.value;
      updateContinueButton();
      renderBooking();
    });
    
    document.getElementById('lessons-select').addEventListener('change', (e) => {
      bookingData.numLessons = parseInt(e.target.value);
      renderBooking();
    });
  } else if (bookingData.step === 2) {
    form.innerHTML = `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold mb-6">Seus dados</h2>

        <div>
          <label class="block text-sm font-semibold mb-2">Nome completo</label>
          <input type="text" placeholder="Digite seu nome" class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600" />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2">Email</label>
          <input type="email" placeholder="seu@email.com" class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600" />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2">Telefone</label>
          <input type="tel" placeholder="(11) 99999-9999" class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600" />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2">Observações (opcional)</label>
          <textarea placeholder="Alguma informação adicional para o instrutor?" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600 resize-none"></textarea>
        </div>

        <div class="flex gap-4">
          <button onclick="previousStep()" class="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold">
            Voltar
          </button>
          <button onclick="nextStep()" class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
            Continuar
          </button>
        </div>
      </div>
    `;
  } else if (bookingData.step === 3) {
    form.innerHTML = `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold mb-6">Pagamento</h2>

        <div>
          <label class="block text-sm font-semibold mb-2">Método de pagamento</label>
          <div class="space-y-3">
            ${['credit', 'debit', 'pix'].map(method => `
              <button
                onclick="selectPayment('${method}')"
                class="payment-btn w-full flex items-center justify-between px-4 py-4 border-2 rounded-lg ${bookingData.paymentMethod === method ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}"
              >
                <div class="flex items-center gap-3">
                  ${method === 'pix' ? '<div class="w-5 h-5 bg-teal-500 rounded"></div>' : `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                  `}
                  <span class="font-semibold">${method === 'credit' ? 'Cartão de Crédito' : method === 'debit' ? 'Cartão de Débito' : 'PIX'}</span>
                </div>
              </button>
            `).join('')}
          </div>
        </div>

        <div id="payment-details"></div>

        <div class="flex gap-4">
          <button onclick="previousStep()" class="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold">
            Voltar
          </button>
          <button onclick="confirmBooking()" class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-semibold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Confirmar Agendamento
          </button>
        </div>
      </div>
    `;
    
    updatePaymentDetails();
  }
}

function selectTime(time) {
  bookingData.selectedTime = time;
  renderBooking();
}

function selectPayment(method) {
  bookingData.paymentMethod = method;
  updatePaymentDetails();
}

function updatePaymentDetails() {
  const details = document.getElementById('payment-details');
  if (!details) return;
  
  if (bookingData.paymentMethod === 'credit' || bookingData.paymentMethod === 'debit') {
    details.innerHTML = `
      <div>
        <label class="block text-sm font-semibold mb-2">Número do cartão</label>
        <input type="text" placeholder="0000 0000 0000 0000" class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold mb-2">Validade</label>
          <input type="text" placeholder="MM/AA" class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2">CVV</label>
          <input type="text" placeholder="000" class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-2">Nome no cartão</label>
        <input type="text" placeholder="Como está impresso no cartão" class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600" />
      </div>
    `;
  } else {
    details.innerHTML = `
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p class="text-sm text-blue-800">Após confirmar, você receberá o código PIX para pagamento</p>
      </div>
    `;
  }
}

function updateContinueButton() {
  const btn = document.getElementById('continue-btn');
  if (btn) {
    btn.disabled = !bookingData.selectedDate || !bookingData.selectedTime;
  }
}

function nextStep() {
  if (bookingData.step < 3) {
    bookingData.step++;
    renderBooking();
  }
}

function previousStep() {
  if (bookingData.step > 1) {
    bookingData.step--;
    renderBooking();
  }
}

function confirmBooking() {
  alert('Agendamento confirmado! Você receberá um email com os detalhes.');
  window.location.href = 'home.html';
}
