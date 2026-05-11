import {DbAcess} from '../database_acess.js'

export class InstructorsRepository{

  database = new DbAcess();
  
  // dados para passar para um ".env!"
  specialtiesMocked= [
    {id: 1, name: 'Primeira Habilitação'},
    {id: 2, name: 'Baliza'}, 
    {id: 3, name: 'Direção Defensiva'}, 
    {id: 4, name: 'Reciclagem'},
    {id: 5, name: 'Moto'}, 
    {id: 6, name: 'Estacionamento'}
  ];

  categoriesMocked= [
    {id: 1, name: 'B'},
    {id: 2, name: 'AB'}
  ]

  async insertIntructor(instructorEntity){
    const queryInsertInstructor = `INSERT INTO instructors (name, image_profile, rating, total_lessons, experience, location, price_per_hour, bio, availability, car_model) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; 
    const valuesInstructor=  [instructorEntity.name, instructorEntity.profileImage, instructorEntity.rating,
    instructorEntity.totalLessons, instructorEntity.experience, instructorEntity.location,
    instructorEntity.pricePerHour, instructorEntity.bio, JSON.stringify(instructorEntity.availability), 
    instructorEntity.carModel];

    const insertInstructor = await this.database.setData_one(queryInsertInstructor, valuesInstructor);
    

    const instructorSpecialist= this.specialtiesMocked.filter( iten => instructorEntity.specialties.includes(iten.name) );
    const instructorCategories= this.categoriesMocked.filter( iten => instructorEntity.categories.includes(iten.name) ) 
    //const instructorCategories= this.categoriesMocked
    
    const placeholdersSpecialties = instructorSpecialist.map( () => '(?,?)').join(',')
    const placeholdersCategories = instructorCategories.map(() => '(?,?)').join(',')

    let queryInstructorSpecialities = `INSERT INTO instructor_specialties (instructor_id, specialty_id) VALUES ${placeholdersSpecialties}`;
    let queryInstructorCategories = `INSERT INTO instructor_categories (instructor_id, category_id) VALUES ${placeholdersCategories}`


    const valuesInstructorSpecialties= []
    const valuesInstructorCategories = []
    
    for(let iten in instructorSpecialist){
      valuesInstructorSpecialties.push( insertInstructor.lastID, instructorSpecialist[iten].id )
    }
    for(let iten in instructorCategories){
      valuesInstructorCategories.push( insertInstructor.lastID, instructorCategories[iten].id )
    }

    const insertSpecialtiesAndInstructor = await this.database.setData_one(queryInstructorSpecialities , valuesInstructorSpecialties)
    const insertCategoriesAndInstructor = await this.database.setData_one(queryInstructorCategories, valuesInstructorCategories)

    return [insertInstructor , insertSpecialtiesAndInstructor, insertCategoriesAndInstructor]

  };
  
  async getInstructors(){
    const queryJoinInstructorRelation = `
      SELECT
        i.id,
        i.name,
        i.location,
        i.image_profile,
        i.rating,
        i.total_lessons,
        i.experience,
        i.price_per_hour,
        i.bio,
        i.availability,
        i.car_model,

        s.id AS specialty_id,
        s.name AS specialty_name,

        c.id AS category_id,
        c.name AS category_name

      FROM instructors AS i

      INNER JOIN instructor_specialties AS ispec
          ON i.id = ispec.instructor_id

      INNER JOIN specialties AS s
          ON s.id = ispec.specialty_id

      INNER JOIN instructor_categories AS ic
          ON i.id = ic.instructor_id

      INNER JOIN categories AS c
          ON c.id = ic.category_id;
    `

    let selectJoinRelationsInstructors = undefined
    let response= []
    
    selectJoinRelationsInstructors = await this.database.readData_all(queryJoinInstructorRelation)
    response.push(selectJoinRelationsInstructors)
    
    return response
  }


  async getInstructorByID( idInstructor, specialties = true, categories = true){
    const querySelectInstructor= `SELECT * FROM instructors WHERE id = ?`
    const querySelecSpecialties = `SELECT * FROM instructor_specialties WHERE instructor_id = ? `
    const querySelecCategories = `SELECT  * FROM instructor_categories WHERE instructor_id = ?`
    const value = idInstructor
    
    let selectSpecialtiesInstructor = undefined
    let selectCategoriesInstructor = undefined
    let selectInstructor = undefined
    let response= []
    
    selectInstructor= await this.database.readData_one(querySelectInstructor, value)
    response.push(selectInstructor)

    if (specialties){
      selectSpecialtiesInstructor = await this.database.readData_all(querySelecSpecialties,value)  
      response.push(selectSpecialtiesInstructor)
    }
    if (categories){
      selectCategoriesInstructor = await this.database.readData_all(querySelecCategories, value)
      response.push(selectCategoriesInstructor)
    }
    
    return response
  }

}



const professor= {
  name: 'Senhor teste da silva gomes',
  profileImage: 'https://imagem_de_teste',
  rating: 5,
  totalLessons: 30,
  experience: 10,
  location: 'São Paulo - Zona Sul',
  pricePerHour: 20,
  bio: 'biografiazinha de teste.',
  availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  carModel: 'Honda Civic 2022',
  specialties: ['Primeira Habilitação', 'Baliza', 'Direção Defensiva'],
  categories: ['B', 'AB']
}
  

//const repository= new InstructorsRepository()
//repository.getInstructorByID(34).then(retorno => console.log(retorno))


const instructors = [
  {
    id: '1',
    name: 'Carlos Silva',
    photo: 'https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzUxMTQxMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    totalLessons: 487,
    experience: 12,
    location: 'São Paulo - Zona Sul',
    pricePerHour: 80,
    bio: 'Instrutor experiente com mais de 12 anos de atuação. Especialista em preparar alunos para o exame prático com foco em segurança e confiança ao volante.',
    availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    carModel: 'Honda Civic 2022',
    categories: ['B', 'AB'],
    specialties: ['Primeira Habilitação', 'Baliza', 'Direção Defensiva'],
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


