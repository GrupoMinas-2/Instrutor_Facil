// Get instructor ID from URL
const urlParams = new URLSearchParams(window.location.search);
const instructorId = urlParams.get('id');

// Load instructor profile on page load
document.addEventListener('DOMContentLoaded', function() {
  if (instructorId) {
    const instructor = instructors.find(i => i.id === instructorId);
    if (instructor) {
      renderProfile(instructor);
    } else {
      document.getElementById('profile-content').innerHTML = '<p class="text-center text-gray-600">Instrutor não encontrado</p>';
    }
  }
});

// Render instructor profile
function renderProfile(instructor) {
  const profileContent = document.getElementById('profile-content');
  profileContent.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <div class="flex-shrink-0">
              <img src="${instructor.photo}" alt="${instructor.name}" class="w-48 h-48 rounded-xl object-cover" />
            </div>

            <div class="flex-1">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h1 class="text-3xl font-bold mb-2">${instructor.name}</h1>
                  <div class="flex items-center gap-2 text-gray-600 mb-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    </svg>
                    ${instructor.location}
                  </div>
                </div>
                <div class="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                  <svg class="w-5 h-5 star-filled" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-xl font-bold">${instructor.rating}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-4 mb-4">
                <div class="flex items-center gap-2 text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                  </svg>
                  <span>${instructor.experience} anos de experiência</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>${instructor.totalLessons} aulas realizadas</span>
                </div>
                <div class="flex items-center gap-2 text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <span>${instructor.carModel}</span>
                </div>
              </div>

              <div class="flex gap-2">
                ${instructor.categories.map(cat => `
                  <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Categoria ${cat}</span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-bold mb-4">Sobre o Instrutor</h2>
          <p class="text-gray-600 leading-relaxed">${instructor.bio}</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-bold mb-4">Especializações</h2>
          <div class="flex flex-wrap gap-3">
            ${instructor.specialties.map(s => `
              <span class="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">${s}</span>
            `).join('')}
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-xl font-bold mb-4">Disponibilidade</h2>
          <div class="flex flex-wrap gap-2">
            ${instructor.availability.map(day => `
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
            <div class="text-4xl font-bold text-blue-600 mb-2">R$ ${instructor.pricePerHour}</div>
            <div class="text-gray-600">por hora/aula</div>
          </div>

          <a href="agendamento.html?id=${instructor.id}" class="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center mb-4 font-semibold">
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
  `;
}
