export class InstructorMapper{
    
    static parseDataInstructor(selectInstructor){
        
        const listDatesInstructors = []
    
        for (let iten of selectInstructor){

        let instructor = listDatesInstructors.find(inst => inst.id === iten.instructor_id)
        
        if(!instructor){
            instructor= {
                idInstructor: iten.instructor_id,
                name: iten.instructor_name ,
                location: JSON.parse(iten.location) ,
                imageProfile: iten.image_profile ,
                rating: iten.rating ,
                totalLessons: iten.total_lessons ,
                experience: iten.experience ,
                pricePerHour: iten.price_per_hour ,
                bio: iten.bio ,
                availability: iten.availability ,
                carModel: iten.car_model ,
                specialties: [] ,
                categories: []
            }
            listDatesInstructors.push(instructor)
        }

        if(!instructor.specialties.find(speciality => speciality.id === iten.specialty_id)){
            instructor.specialties.push({
                idSpecialty: iten.specialty_id,
                nameSpecialty: iten.specialty_name
            })
        }

        if(!instructor.categories.find(category => category.id === iten.category_id)){
            instructor.categories.push({
                idCategory: iten.category_id,
                nameCategory: iten.category_name
            })
        }
        }
        
        return listDatesInstructors
        
    }

    static listInstructors(){
        
    }
}


/**
 // retorno direto do banco 
 [
  {
    instructor_id: 1,
    instructor_name: 'Camila Rodrigues',
    location: '{"cep":99999999,"rua":"Rua do Rosário","bairro":"Savassi","numero":"210","Cidade":"Belo Horizonte","estado":"Minas Gerais"}',
    image_profile: 'https://habilitacao.cfcsilvalobo.com/auto-escola/imagens/primeiro-habilitacao-valores.jpg',
    rating: 4.6,
    total_lessons: 150,
    experience: 6,
    price_per_hour: 50,
    bio: 'Especialista em baliza e técnicas de estacionamento urbanas.',
    availability: '["Terça","Quarta","Quinta","Sábado"]',
    car_model: 'Honda Fit 2019',
    specialty_id: 2,
    specialty_name: 'Baliza',
    category_id: 1,
    category_name: 'B'
  },
  {
    instructor_id: 1,
    instructor_name: 'Camila Rodrigues',
    location: '{"cep":99999999,"rua":"Rua do Rosário","bairro":"Savassi","numero":"210","Cidade":"Belo Horizonte","estado":"Minas Gerais"}',
    image_profile: 'https://habilitacao.cfcsilvalobo.com/auto-escola/imagens/primeiro-habilitacao-valores.jpg',
    rating: 4.6,
    total_lessons: 150,
    experience: 6,
    price_per_hour: 50,
    bio: 'Especialista em baliza e técnicas de estacionamento urbanas.',
    availability: '["Terça","Quarta","Quinta","Sábado"]',
    car_model: 'Honda Fit 2019',
    specialty_id: 3,
    specialty_name: 'Direção Defensiva',
    category_id: 1,
    category_name: 'B'
  },
  {
    instructor_id: 1,
    instructor_name: 'Camila Rodrigues',
    location: '{"cep":99999999,"rua":"Rua do Rosário","bairro":"Savassi","numero":"210","Cidade":"Belo Horizonte","estado":"Minas Gerais"}',
    image_profile: 'https://habilitacao.cfcsilvalobo.com/auto-escola/imagens/primeiro-habilitacao-valores.jpg',
    rating: 4.6,
    total_lessons: 150,
    experience: 6,
    price_per_hour: 50,
    bio: 'Especialista em baliza e técnicas de estacionamento urbanas.',
    availability: '["Terça","Quarta","Quinta","Sábado"]',
    car_model: 'Honda Fit 2019',
    specialty_id: 6,
    specialty_name: 'Estacionamento',
    category_id: 1,
    category_name: 'B'
  }
]
*/
/*
// retorno formatado 
    [
        {
            id: 1,
            name: 'Camila Rodrigues',
            location: {
                cep: 99999999,
                rua: 'Rua do Rosário',
                bairro: 'Savassi',
                numero: '210',
                Cidade: 'Belo Horizonte',
                estado: 'Minas Gerais'
            },
            image_profile: 'https://habilitacao.cfcsilvalobo.com/auto-escola/imagens/primeiro-habilitacao-valores.jpg',
            rating: 4.6,
            total_lessons: 150,
            experience: 6,
            price_per_hour: 50,
            bio: 'Especialista em baliza e técnicas de estacionamento urbanas.',
            availability: '["Terça","Quarta","Quinta","Sábado"]',
            car_model: 'Honda Fit 2019',
            specialties: [ [Object], [Object], [Object] ],
            categories: [ [Object] ]
        }
    ]

*/