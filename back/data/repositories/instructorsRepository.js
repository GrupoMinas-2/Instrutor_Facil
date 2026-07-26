import { json } from 'express';
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
    {id: 2, name: 'AB'},
    {id: 3, name: 'A'},
    {id: 4, name: 'C'},
    {id: 5, name: 'D'},
    {id: 6, name: 'E'}
  ]
  
  parseJsonArray(value, dataContext){
    
    if(!Array.isArray(value)){

      try {
        const parsed = JSON.parse(value)
        if (Array.isArray(parsed) || typeof value == 'object' || typeof value == 'string' ) {
          return parsed
        }
      } catch (error) {
        return {
          erro: error, 
          mensage: `erro ao trasnsformar o retorno do banco em Obejeto JavaScript - ${dataContext}`
        }
      }
      
    }
    return value
  }


  async insertIntructor(instructorEntity){
    const queryInsertInstructor = `INSERT INTO instructors (name, image_profile, rating, total_lessons, experience, location, price_per_hour, bio, availability, car_model) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; 
    const valuesInstructor=  [instructorEntity.name, instructorEntity.profileImage, instructorEntity.rating,
    instructorEntity.totalLessons, instructorEntity.experience, JSON.stringify(instructorEntity.location),
    instructorEntity.pricePerHour, instructorEntity.bio, JSON.stringify(instructorEntity.availability), 
    instructorEntity.carModel];

    const insertInstructor = await this.database.setData_one(queryInsertInstructor, valuesInstructor);

    const normalizedSpecialties = (instructorEntity.specialties || []).map(item => String(item).toLowerCase());
    const normalizedCategories = (instructorEntity.categories || []).map(item => String(item).toLowerCase());

    const instructorSpecialist = this.specialtiesMocked.filter(iten =>
      normalizedSpecialties.includes(iten.name.toLowerCase())
    );
    const instructorCategories = this.categoriesMocked.filter(iten =>
      normalizedCategories.includes(iten.name.toLowerCase())
    );

    const valuesInstructorSpecialties = [];
    const valuesInstructorCategories = [];

    let insertSpecialtiesAndInstructor = null;
    let insertCategoriesAndInstructor = null;

    if (instructorSpecialist.length > 0) {
      const placeholdersSpecialties = instructorSpecialist.map(() => '(?,?)').join(',');
      const queryInstructorSpecialities = `INSERT INTO instructor_specialties (instructor_id, specialty_id) VALUES ${placeholdersSpecialties}`;
      for (const specialty of instructorSpecialist) {
        valuesInstructorSpecialties.push(insertInstructor.lastID, specialty.id);
      }
      insertSpecialtiesAndInstructor = await this.database.setData_one(queryInstructorSpecialities, valuesInstructorSpecialties);
    }

    if (instructorCategories.length > 0) {
      const placeholdersCategories = instructorCategories.map(() => '(?,?)').join(',');
      const queryInstructorCategories = `INSERT INTO instructor_categories (instructor_id, category_id) VALUES ${placeholdersCategories}`;
      for (const category of instructorCategories) {
        valuesInstructorCategories.push(insertInstructor.lastID, category.id);
      }
      insertCategoriesAndInstructor = await this.database.setData_one(queryInstructorCategories, valuesInstructorCategories);
    }

    return [insertInstructor, insertSpecialtiesAndInstructor, insertCategoriesAndInstructor];

  };
  
  async getInstructors(){
    const queryJoinInstructorRelation = `
      SELECT
        instructors.id AS instructor_id,
        instructors.name AS instructor_name,
        instructors.location,
        instructors.image_profile,
        instructors.rating,
        instructors.total_lessons,
        instructors.experience,
        instructors.price_per_hour,
        instructors.bio,
        instructors.availability,
        instructors.car_model,

        specialties.id AS specialty_id,
        specialties.name AS specialty_name,

        categories.id AS category_id,
        categories.name AS category_name

      FROM instructors

      INNER JOIN instructor_specialties 
          ON instructors.id = instructor_specialties.instructor_id

      INNER JOIN specialties
          ON specialties.id = instructor_specialties.specialty_id

      INNER JOIN instructor_categories
          ON instructors.id = instructor_categories.instructor_id

      INNER JOIN categories
          ON categories.id = instructor_categories.category_id;
    `

    const selectJoinRelationsInstructors = await this.database.readData_all(queryJoinInstructorRelation)

    const listInstructors= []
    
    for(let iten of selectJoinRelationsInstructors){
      
      let instructor = listInstructors.find(inst => inst.id === iten.instructor_id)
      
      if(!instructor){
        instructor= {
          id: iten.instructor_id,
          name: iten.instructor_name ,
          location: JSON.parse(iten.location) ,
          image_profile: iten.image_profile ,
          rating: iten.rating ,
          total_lessons: iten.total_lessons ,
          experience: iten.experience ,
          price_per_hour: iten.price_per_hour ,
          bio: iten.bio ,
          availability: iten.availability ,
          car_model: iten.car_model ,
          specialties: [] ,
          categories: []
        }
        listInstructors.push(instructor)
      }

      if(!instructor.specialties.find(speciality => speciality.id === iten.specialty_id)){
        instructor.specialties.push({
          id: iten.specialty_id,
          name: iten.specialty_name
        })
      }

      if(!instructor.categories.find(category => category.id === iten.category_id)){
        instructor.categories.push({
          id: iten.category_id,
          name: iten.category_name
        })
      }

    }
    
    return listInstructors
  }

  async getInstructorByID( idInstructor, specialties = true, categories = true){
    
    const queryJoinInstructorRelation = `
      SELECT
        instructors.id AS instructor_id,
        instructors.name AS instructor_name,
        instructors.location,
        instructors.image_profile,
        instructors.rating,
        instructors.total_lessons,
        instructors.experience,
        instructors.price_per_hour,
        instructors.bio,
        instructors.availability,
        instructors.car_model,

        specialties.id AS specialty_id,
        specialties.name AS specialty_name,

        categories.id AS category_id,
        categories.name AS category_name

      FROM instructors

      INNER JOIN instructor_specialties 
          ON instructors.id = instructor_specialties.instructor_id

      INNER JOIN specialties
          ON specialties.id = instructor_specialties.specialty_id

      INNER JOIN instructor_categories
          ON instructors.id = instructor_categories.instructor_id

      INNER JOIN categories
          ON categories.id = instructor_categories.category_id

      WHERE instructors.id = ? 
    `
    const value = idInstructor

    //const querySelectInstructor= `SELECT * FROM instructors WHERE id = ?`
    //const querySelecSpecialties = `SELECT * FROM instructor_specialties WHERE instructor_id = ? `
    //const querySelecCategories = `SELECT  * FROM instructor_categories WHERE instructor_id = ?`
    
    //let selectSpecialtiesInstructor = undefined
    //let selectCategoriesInstructor = undefined
    //let response= []
    //response.push(selectInstructor)
    
    const selectInstructor = await this.database.readData_all(queryJoinInstructorRelation, value)

    const listDatesInstructors = []

    for (let iten of selectInstructor){

      let instructor = listDatesInstructors.find(inst => inst.id === iten.instructor_id)
      
      if(!instructor){
        instructor= {
          id: iten.instructor_id,
          name: iten.instructor_name ,
          location: JSON.parse(iten.location) ,
          image_profile: iten.image_profile ,
          rating: iten.rating ,
          total_lessons: iten.total_lessons ,
          experience: iten.experience ,
          price_per_hour: iten.price_per_hour ,
          bio: iten.bio ,
          availability: iten.availability ,
          car_model: iten.car_model ,
          specialties: [] ,
          categories: []
        }
        listDatesInstructors.push(instructor)
      }

      if(!instructor.specialties.find(speciality => speciality.id === iten.specialty_id)){
        instructor.specialties.push({
          id: iten.specialty_id,
          name: iten.specialty_name
        })
      }

      if(!instructor.categories.find(category => category.id === iten.category_id)){
        instructor.categories.push({
          id: iten.category_id,
          name: iten.category_name
        })
      }
    }
    
    return listDatesInstructors
  }


  async insertInstructorAvailability(objectAvailability){

    const queryInsertAvailability= `INSERT INTO instructor_availability ( instructor_id, days_week, working_time, lunchtime, blocked_days) VALUES (?,?,?,?,?)`

    const valuesAvailability = [objectAvailability.instructorId, objectAvailability.daysWeek, objectAvailability.workingTime, objectAvailability.lunchtime, objectAvailability.blockedDays]

    try {
      const availability = await this.database.setData_one(queryInsertAvailability, valuesAvailability)
      return availability

    } catch (error) {
      return {
        status: 'erro',
        mensage: `${error}`
      }
    }

  }

  async getInstructorAvailability(){
    const queryGetAvailability = `SELECT * FROM instructor_availability`

    try {
      const instructorAvailability = await this.database.readData_all(queryGetAvailability)
      return instructorAvailability
    } catch (error) {
      return {
        status: 'erro',
        mensage: `${error}`
      }
    }

  }

  async getInstructorAvailabilityById(idInstructor){
    const queryGetAvailability= `SELECT * FROM instructor_availability WHERE instructor_id = ?`
    const valueId = idInstructor
    try {
      const instructorAvailability= await this.database.readData_one(queryGetAvailability, valueId)
      
      if (instructorAvailability) {
        instructorAvailability.days_week = this.parseJsonArray(instructorAvailability.days_week, 'days_week')
        instructorAvailability.blocked_days = this.parseJsonArray(instructorAvailability.blocked_days, 'blocked_days')
        instructorAvailability.working_time = this.parseJsonArray(instructorAvailability.working_time, 'working_time')
        instructorAvailability.lunchtime = this.parseJsonArray(instructorAvailability.lunchtime, 'lunchtime') 
      }

      return instructorAvailability

    } catch (error) {
      return {
        status: 'erro',
        mensage: `${error}`
      }
    }
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


instructorsMocked : [
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


// Código de teste: executa inserção quando o arquivo for executado diretamente.
// Remova ou mantenha comentado em produção. Agora protegido para execução direta.
//if (process && process.argv && process.argv[1] && process.argv[1].endsWith('instructorsRepository.js')) { }
//const repository= new InstructorsRepository()
//repository.insertIntructor(professor).then(retorno => console.log(retorno))
//repository.getInstructorByID(34).then(retorno => console.log(retorno))

const repository = new InstructorsRepository()

const availability = {
  instructorId: 10 ,
	daysWeek:'[{"id": 1, "display": "SEGUNDA"}, {"id": 2, "display":"TERÇA"}, {"id": 3, "display":"QUARTA"}]',
	workingTime:`{
    "init": "07:00",
    "final": "18:00"
  }`,
	lunchtime:`{
    "init": "11:30",
    "final": "13:00"
  }`,
	blockedDays:'["2026-07-09", "2026-04-29"]',
}

//repository.getInstructorByID(1).then(item => console.log(item))
//repository.insertInstructorAvailability(availability).then(item => console.log(item))
//repository.getInstructorAvailability().then(item => JSON.stringify(item)).then(item => console.log(item))
//repository.getInstructorAvailabilityById(1).then(item => JSON.stringify(item)).then(item => console.log(item))


