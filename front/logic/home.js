// Load instructors on page load
document.addEventListener('DOMContentLoaded', function() {
  loadInstructors();
});

// Load instructors into grid
function loadInstructors() {
  const grid = document.getElementById('instructors-grid');
  grid.innerHTML = instructors.map(instructor => `
    <a href="instrutor.html?id=${instructor.id}" class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
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
