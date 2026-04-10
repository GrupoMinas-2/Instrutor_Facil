// Instructors Data
const instructors = [
  {
    id: '1',
    name: 'Carlos Silva',
    photo: 'https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzUxMTQxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    totalLessons: 487,
    experience: 12,
    specialties: ['Primeira Habilitação', 'Baliza', 'Direção Defensiva'],
    location: 'São Paulo - Zona Sul',
    pricePerHour: 80,
    bio: 'Instrutor experiente com mais de 12 anos de atuação. Especialista em preparar alunos para o exame prático com foco em segurança e confiança ao volante.',
    availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    carModel: 'Honda Civic 2022',
    categories: ['B', 'AB'],
  },
  {
    id: '2',
    name: 'Mariana Santos',
    photo: 'https://cdn.dol.com.br/img/Artigo-Destaque/800000/1200x0/MANOEL-OK-1_00809202_0_-t.webp?fallback=https%3A%2F%2Fcdn.dol.com.br%2Fimg%2FArtigo-Destaque%2F800000%2FMANOEL-OK-1_00809202_0_.jpg%3Fxid%3D2629885&xid=2629885',
    rating: 5.0,
    totalLessons: 623,
    experience: 15,
    specialties: ['Primeira Habilitação', 'Reciclagem', 'Motoristas Iniciantes'],
    location: 'São Paulo - Zona Oeste',
    pricePerHour: 85,
    bio: 'Instrutora dedicada com metodologia própria para alunos que têm medo ou ansiedade ao dirigir. Ambiente acolhedor e paciência são meus diferenciais.',
    availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    carModel: 'Toyota Corolla 2023',
    categories: ['B'],
  },
  {
    id: '3',
    name: 'Roberto Almeida',
    photo: 'https://images.unsplash.com/photo-1770058428159-50cca6566c19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1MTgwMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    totalLessons: 891,
    experience: 20,
    specialties: ['Primeira Habilitação', 'Direção Noturna', 'Estradas'],
    location: 'São Paulo - Zona Norte',
    pricePerHour: 90,
    bio: 'Veterano no ensino de direção veicular. Mais de 20 anos formando condutores responsáveis e seguros. Especialista em preparação completa para todas as situações de trânsito.',
    availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    carModel: 'Volkswagen Jetta 2021',
    categories: ['B', 'AB'],
  },
  {
    id: '4',
    name: 'Juliana Costa',
    photo: 'https://images.unsplash.com/photo-1522206038088-8698bcefa6a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NTE4MDE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    totalLessons: 345,
    experience: 8,
    specialties: ['Primeira Habilitação', 'Estacionamento', 'Baliza'],
    location: 'São Paulo - Zona Leste',
    pricePerHour: 75,
    bio: 'Instrutora jovem e dinâmica, com didática moderna e linguagem acessível. Especialista em ensinar manobras complexas de forma simples e eficaz.',
    availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    carModel: 'Chevrolet Onix 2022',
    categories: ['B'],
  },
  {
    id: '5',
    name: 'Fernando Lima',
    photo: 'https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2026/02/27/1011275888-quanto-manoel-gomes-ganha-por-show-caneta-azul-multiplicou-o-valor.jpg',
    rating: 4.7,
    totalLessons: 567,
    experience: 14,
    specialties: ['Primeira Habilitação', 'Direção Defensiva', 'Trânsito Urbano'],
    location: 'São Paulo - Centro',
    pricePerHour: 85,
    bio: 'Instrutor experiente com foco em segurança e ética no trânsito. Atendimento personalizado e horários flexíveis para melhor se adequar à sua rotina.',
    availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    carModel: 'Hyundai HB20 2023',
    categories: ['B'],
  },
  {
    id: '6',
    name: 'Amanda Rodrigues',
    photo: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTEwMzU0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5.0,
    totalLessons: 412,
    experience: 10,
    specialties: ['Primeira Habilitação', 'Reciclagem', 'Terceira Idade'],
    location: 'São Paulo - Zona Sul',
    pricePerHour: 80,
    bio: 'Instrutora paciente e atenciosa, especializada em atender alunos da terceira idade e pessoas que precisam de reciclagem. Aulas tranquilas e no seu ritmo.',
    availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    carModel: 'Fiat Argo 2022',
    categories: ['B'],
  },
];

// State management
let currentView = 'home';
let selectedInstructor = null;
let bookingData = {
  step: 1,
  selectedDate: '',
  selectedTime: '',
  numLessons: 1,
  paymentMethod: 'credit'
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  loadInstructors();
  navigate('home');
});

// Navigation
function navigate(view, instructorId = null) {
  // Hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  
  currentView = view;
  
  if (view === 'home') {
    document.getElementById('home-view').classList.add('active');
    window.scrollTo(0, 0);

  } else if (view === 'profile' && instructorId) {
    selectedInstructor = instructors.find(i => i.id === instructorId);

    if (selectedInstructor) {
      renderProfile();
      document.getElementById('profile-view').classList.add('active');
      window.scrollTo(0, 0);
    }

  } else if (view === 'booking' && instructorId) {
    selectedInstructor = instructors.find(i => i.id === instructorId);

    if (selectedInstructor) {
      bookingData.step = 1;
      renderBooking();
      document.getElementById('booking-view').classList.add('active');
      window.scrollTo(0, 0);
    }

  }
}

// Load instructors into grid
function loadInstructors() {
  const grid = document.getElementById('instructors-grid');
  grid.innerHTML = instructors.map(instructor => `

    <a href="#" onclick="navigate('profile', '${instructor.id}'); return false;" class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">

      <div class="relative h-64">
        <img
          src="${instructor.photo}"
          alt="${instructor.name}"
          class="w-full h-full object-cover"
        />
        
        <div class="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
        
          <svg class="w-4 h-4 star-filled" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>

          <span class="text-sm font-semibold">${instructor.rating}</span>
        
        </div>

      </div>
      
      <div class="p-5">

        <h3 class="text-xl font-bold mb-2">${instructor.name}</h3>
        
        <div class="flex items-center gap-2 text-sm text-gray-600 mb-3">

          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          ${instructor.location}

        </div>

        <div class="flex items-center gap-2 text-sm text-gray-600 mb-4">

          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
          </svg>
          ${instructor.experience} anos • ${instructor.totalLessons} aulas

        </div>

        <div class="flex flex-wrap gap-2 mb-4">

          ${instructor.specialties.slice(0, 2).map(s => `
            <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">${s}</span>
          `).join('')}

        </div>

        <div class="flex items-baseline gap-1 border-t pt-4">

          <span class="text-2xl font-bold text-blue-600">R$ ${instructor.pricePerHour}</span>
          <span class="text-gray-500">/hora</span>

        </div>

      </div>

    </a>

  `).join('');
}

// Render instructor profile
function renderProfile() {
  const reviews = [
    { name: 'Maria Silva', rating: 5, comment: 'Excelente instrutor! Muito paciente e didático. Consegui passar de primeira graças às aulas.', date: '15/03/2026' },
    { name: 'João Santos', rating: 5, comment: 'Recomendo muito! Profissional sério e competente. As aulas são muito produtivas.', date: '10/03/2026' },
    { name: 'Ana Costa', rating: 4, comment: 'Muito bom instrutor, aprendi bastante. Só acho que poderia ter mais horários disponíveis.', date: '05/03/2026' },
  ];

  const profileView = document.getElementById('profile-view');
  profileView.innerHTML = `
    <div class="bg-gray-50 min-h-screen">
      <div class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a href="#" onclick="navigate('home'); return false;" class="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Voltar para lista de instrutores
          </a>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex flex-col md:flex-row gap-6">
                <div class="flex-shrink-0">
                  <img src="${selectedInstructor.photo}" alt="${selectedInstructor.name}" class="w-48 h-48 rounded-xl object-cover" />
                </div>

                <div class="flex-1">
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <h1 class="text-3xl font-bold mb-2">${selectedInstructor.name}</h1>
                      <div class="flex items-center gap-2 text-gray-600 mb-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        </svg>
                        ${selectedInstructor.location}
                      </div>
                    </div>
                    <div class="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                      <svg class="w-5 h-5 star-filled" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span class="text-xl font-bold">${selectedInstructor.rating}</span>
                    </div>
                  </div>

                  <div class="flex flex-wrap gap-4 mb-4">
                    <div class="flex items-center gap-2 text-gray-600">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                      </svg>
                      <span>${selectedInstructor.experience} anos de experiência</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-600">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>${selectedInstructor.totalLessons} aulas realizadas</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-600">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                      <span>${selectedInstructor.carModel}</span>
                    </div>
                  </div>

                  <div class="flex gap-2">
                    ${selectedInstructor.categories.map(cat => `
                      <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Categoria ${cat}</span>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6">
              <h2 class="text-xl font-bold mb-4">Sobre o Instrutor</h2>
              <p class="text-gray-600 leading-relaxed">${selectedInstructor.bio}</p>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6">
              <h2 class="text-xl font-bold mb-4">Especializações</h2>
              <div class="flex flex-wrap gap-3">
                ${selectedInstructor.specialties.map(s => `
                  <span class="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">${s}</span>
                `).join('')}
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6">
              <h2 class="text-xl font-bold mb-4">Disponibilidade</h2>
              <div class="flex flex-wrap gap-2">
                ${selectedInstructor.availability.map(day => `
                  <span class="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium">${day}</span>
                `).join('')}
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-6">
              <h2 class="text-xl font-bold mb-4">Avaliações</h2>
              <div class="space-y-4">
                ${reviews.map(review => `
                  <div class="border-b last:border-0 pb-4 last:pb-0">
                    <div class="flex items-center justify-between mb-2">
                      <div>
                        <div class="font-semibold">${review.name}</div>
                        <div class="text-sm text-gray-500">${review.date}</div>
                      </div>
                      <div class="flex items-center gap-1">
                        ${Array(review.rating).fill(0).map(() => `
                          <svg class="w-4 h-4 star-filled" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        `).join('')}
                      </div>
                    </div>
                    <p class="text-gray-600">${review.comment}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-lg p-6 sticky top-20">
              <div class="text-center mb-6">
                <div class="text-4xl font-bold text-blue-600 mb-2">R$ ${selectedInstructor.pricePerHour}</div>
                <div class="text-gray-600">por hora/aula</div>
              </div>

              <a href="#" onclick="navigate('booking', '${selectedInstructor.id}'); return false;" class="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center mb-4 font-semibold">
                Agendar Aulas
              </a>

              <button class="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
                Enviar Mensagem
              </button>

              <div class="mt-6 pt-6 border-t space-y-3">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Resposta em até 24h
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Cancelamento grátis
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Pagamento seguro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render booking page
function renderBooking() {
  const bookingView = document.getElementById('booking-view');
  const total = selectedInstructor.pricePerHour * bookingData.numLessons;
  
  bookingView.innerHTML = `
    <div class="bg-gray-50 min-h-screen">
      <div class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a href="#" onclick="navigate('profile', '${selectedInstructor.id}'); return false;" class="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Voltar para perfil
          </a>
        </div>
      </div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
                <img src="${selectedInstructor.photo}" alt="${selectedInstructor.name}" class="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <div class="font-semibold">${selectedInstructor.name}</div>
                  <div class="text-sm text-gray-600">${selectedInstructor.location}</div>
                </div>
              </div>

              <div class="space-y-3 mb-6 pb-6 border-b">
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
                  <span class="text-gray-600">${bookingData.numLessons}x R$ ${selectedInstructor.pricePerHour}</span>
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
          <div class="grid grid-cols-3 gap-3">
            ${['08:00', '10:00', '14:00', '16:00', '18:00'].map(time => `
              <button
                onclick="selectTime('${time}')"
                class="px-4 py-3 border-2 rounded-lg font-semibold ${bookingData.selectedTime === time ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 hover:border-blue-300'}"
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
          class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          ${!bookingData.selectedDate || !bookingData.selectedTime ? 'disabled' : ''}
        >
          Continuar
        </button>
      </div>
    `;
    
    document.getElementById('date-input').addEventListener('change', (e) => {
      bookingData.selectedDate = e.target.value;
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
                class="w-full flex items-center justify-between px-4 py-4 border-2 rounded-lg ${bookingData.paymentMethod === method ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}"
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
  navigate('home');
}
