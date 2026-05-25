// Photo preview
  const photoInput = document.getElementById('photo');
  const photoUrlInput = document.getElementById('photo-url');
  const photoPreview = document.getElementById('photo-preview');

  function updatePhotoPreview(url) {
    if (!photoPreview) return;
    photoPreview.innerHTML = url
      ? `<img src="${url}" class="w-full h-full object-cover" />`
      : `
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>`;
  }

  if (photoInput) {
    photoInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        photoUrlInput.value = '';
        const reader = new FileReader();
        reader.onload = function(e) {
          updatePhotoPreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (photoUrlInput) {
    photoUrlInput.addEventListener('input', function(e) {
      const url = e.target.value.trim();
      updatePhotoPreview(url || '');
    });
  }

  // Credential preview
  document.getElementById('credential').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const preview = document.getElementById('credential-preview');
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          preview.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover" />`;
        };
        reader.readAsDataURL(file);
      } else {
        preview.innerHTML = `<p>${file.name}</p>`;
      }
    }
  });

  // Vehicle license preview
  document.getElementById('vehicle-license').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const preview = document.getElementById('license-preview');
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          preview.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover" />`;
        };
        reader.readAsDataURL(file);
      } else {
        preview.innerHTML = `<p>${file.name}</p>`;
      }
    }
  });




  // Form submit
  function formDataToObject(formData) {
    const data = {};

    for (const [key, value] of formData.entries()) {

      if (data[key] !== undefined) {

        if (!Array.isArray(data[key])) {

          data[key] = [data[key]];

        }
        
        data[key].push(value);

      } else {

        data[key] = value;

      }
    }

    return data;
  }


async function createInstructor(objectInstructor) {
    try {
      const response = await fetch('http://localhost:3333/instructors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectInstructor)
      });

      if (!response.ok) {
        const errorBody = await response.text();
        return {
          message: 'não foi possível criar instrutor',
          status: response.status,
          error: errorBody
        };
      }

      return await response.json();
    } catch (error) {
      return {
        message: 'não foi possível criar instrutor',
        error: error.message || error
      };
    }
  }

  const formInstructor = document.getElementById('instructor-form');

  formInstructor.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formInstructor);
    const objectDataForm = formDataToObject(formData);

    const categories = formData.getAll('category').map(value => value.toString().toLowerCase());
    const specialties = formData.getAll('specialty').map(value => value.toString().toLowerCase());
    const availability = formData.getAll('availability');
    const carFeatures = formData.getAll('car-feature');

    objectDataForm.category = categories;
    objectDataForm.specialty = specialties;
    objectDataForm.availability = availability;
    objectDataForm['car-feature'] = carFeatures;

    console.log('formData object:', objectDataForm);

    const processedData = {
      name: objectDataForm.name,
      profileImage: objectDataForm.photoUrl,
      email: objectDataForm.email,
      phone: objectDataForm.phone,
      location: objectDataForm.location,
      experience: Number(objectDataForm.experience) || 0,
      pricePerHour: Number(objectDataForm.price) || 0,
      bio: objectDataForm.bio,
      availability: availability,
      categories: categories,
      specialties: specialties,
      carModel: objectDataForm['car-model'] || null,
      carPlate: objectDataForm['car-plate'] || null,
      carYear: objectDataForm['car-year'] ? Number(objectDataForm['car-year']) : null,
      hasCar: objectDataForm['has-car'] === 'on',
      termsAccepted: objectDataForm.terms === 'on'
    };

    console.log('Data processed:', processedData);

    const createResult = await createInstructor(processedData);
    console.log('createInstructor result:', createResult);
  });



/*
  
    {
        "name": "Rita Cassia",
        "profileImage": "https://images.pexels.com/photos/32222185/pexels-photo-32222185.jpeg?_gl=1*nipp18*_ga*MTk4OTI0Mzc0Ni4xNzc5MzMwNzU5*_ga_8JE65Q40S6*czE3NzkzMzA3NTgkbzEkZzEkdDE3NzkzMzA3NzgkajQwJGwwJGgw",
        "rating": 7,
        "totalLessons": 20,
        "experience": 4,
        "location": {
                "cep": 39629971,
                "rua": "Praça Sagrada Família, s/n",
                "bairro": "centro",
                "numero": "342",
                "Cidade": "Água Branca de Minas",
                "estado": "Minas Gerais"
            },
        "pricePerHour": 30,
        "bio": "Sou uma instrutora focada em aulas de diração para mulhesre, oferecendo segurança e identificação durante o processo",
        "availability": ["Segunda", "Terça", "Quarta", "Quinta", "sexta", "Sábado"],
            "carModel": "Honda Civic 2022",
        "specialties": ["Primeira Habilitação", "Direção Defensiva"],
        "categories": ["B", "AB"]
    }
  
  */

/*
    {
    "name": "Gabriel Eduardo",
    "photo": {},
    "email": "carmogabriel0429@gmail.com",
    "phone": "(31) 97122-2038",
    "location": "minas gerais",
    "experience": "20",
    "price": "35",
    "bio": "teste",
    "availability": [
        "Segunda"
    ],
    "category": [
        "A"
    ],
    "specialty": [
        "Primeira Habilitação"
    ],

----------------------- não trato ainda: 
    "credential": {},
    "vehicle-license": {},
    "has-car": "on",
    "car-model": "",
    "car-plate": "",
    "car-year": "",
    "terms": "on",
    "car-feature": []
}
*/