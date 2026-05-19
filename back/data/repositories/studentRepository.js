import { DbAcess } from "../database_acess.js";
//import { InstructorsRepository } from "./instructorsRepository.js";

export class StudentRepository {
    database = new DbAcess();

    learningMocked= [
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
        {id: 3, name: 'A'}
    ]

    async insertStudent(student){
        const created_at = new Date().toISOString();

        const queryInsertStudent = `INSERT INTO students (name, email, phone, cpf, document_id, birthdate, location, created_at ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`; 

        const valueStudent = [ student.name, student.email, student.phone, student.cpf, student.document_id, student.birthdate, JSON.stringify(student.location), created_at];

        const  insertStudent= await this.database.setData_one(queryInsertStudent , valueStudent); 


        const studentDesiredCategory = this.categoriesMocked.filter( iten => student.desired_license_category.includes(iten.name));
        const studentLearning = this.learningMocked.filter(iten => student.learning_goal.includes(iten.name));


        const categoriesPlaceHolder = studentDesiredCategory.map(() => "(?,?)").join(',');
        const learningPlaceHolder = studentLearning.map(() => "(?,?)").join(',');

        let queryStudentLearning = `INSERT INTO student_specialties (student_id, specialty_id) VALUES ${learningPlaceHolder}`;
        let queryStudentCategories = `INSERT INTO student_categories (student_id, category_id) VALUES ${categoriesPlaceHolder}`;
        
        const valuesStudentLearning = [] 
        const valuesStudentCategories = [] 
        

        for(let item of studentLearning){
            valuesStudentLearning.push(insertStudent.lastID, item.id);
        }
        for(let item of studentDesiredCategory){
            valuesStudentCategories.push(insertStudent.lastID, item.id);
        }

        
        const insertSpecialtiesAndStudent = await this.database.setData_one(queryStudentLearning, valuesStudentLearning);
        const insertCategoriesAndStudent = await this.database.setData_one(queryStudentCategories, valuesStudentCategories); 
        
        
        return [insertStudent, insertCategoriesAndStudent, insertSpecialtiesAndStudent]
        
    }
    
    async getStudents(){
        const queryJoinStudentRelation = ` 
            SELECT
            students.id AS student_id,
            students.name AS student_name,
            students.email,
            students.phone,
            students.cpf,
            students.document_id,
            students.birthdate,
            students.location,
            students.created_at,

            specialties.id AS specialty_id,
            specialties.name AS specialty_name, 

            categories.id AS category_id,
            categories.name AS category_name

            FROM students 

            INNER JOIN student_specialties
                ON students.id = student_specialties.student_id
            
            INNER JOIN specialties
                ON specialties.id = student_specialties.specialty_id

            INNER JOIN student_categories
                ON students.id = student_categories.student_id

            INNER JOIN categories 
                ON categories.id = student_categories.category_id
        ` 

        const baseStudentsRelation = await this.database.readData_all(queryJoinStudentRelation)

        const listDataStudents = []

        for(let iten of baseStudentsRelation){

            let student = listDataStudents.find( item => item.id === iten.student_id )
            
            if(!student){
                
                student = {
                    id: iten.student_id,
                    name: iten.student_name,
                    emai: iten.email,
                    phone: iten.phone,
                    cpf: iten.cpf,
                    document_id: iten.document_id,
                    birthdate: iten.birthdate,
                    location: JSON.parse(iten.location),
                    created_at: iten.created_at, 
                    specialties:[],
                    categories:[]
                }
            
                listDataStudents.push(student)
            }

            if(!student.specialties.find( specialty => specialty.id === iten.specialty_id)){

                student.specialties.push({
                    id: iten.specialty_id,
                    name: iten.specialty_name
                })
            }

            if(!student.categories.find( category => category.id === iten.category_id)){
                student.categories.push({
                    id: iten.category_id,
		            name: iten.category_name
                })
            }
            

        }
        
        //return baseStudentsRelation 
        return listDataStudents 
    }
    
    async getStudentsById(idStudent){
        const queryJoinStudentRelationById =  ` 
            SELECT
            students.id AS student_id,
            students.name AS student_name,
            students.email,
            students.phone,
            students.cpf,
            students.document_id,
            students.birthdate,
            students.location,
            students.created_at,

            specialties.id AS specialty_id,
            specialties.name AS specialty_name, 

            categories.id AS category_id,
            categories.name AS category_name

            FROM students 

            INNER JOIN student_specialties
                ON students.id = student_specialties.student_id
            
            INNER JOIN specialties
                ON specialties.id = student_specialties.specialty_id

            INNER JOIN student_categories
                ON students.id = student_categories.student_id

            INNER JOIN categories 
                ON categories.id = student_categories.category_id
            
            WHERE students.id = ?
        ` 
        const valueIdStudent = idStudent

        const dataStudent = await this.database.readData_all(queryJoinStudentRelationById , valueIdStudent)

		const listDatesStudent = []
		
		for(let item of dataStudent){
			
			let student = listDatesStudent.find( std => std.id === item.student_id)

			if(!student){

				student = {
					id: item.student_id,
					name: item.student_name,
					emai: item.email,
					phone: item.phone,
					cpf: item.cpf,
					document_id: item.document_id,
					birthdate: item.birthdate,
					location: JSON.parse(item.location),
					created_at: item.created_at, 
					specialties:[],
					categories:[]
				}
				listDatesStudent.push(student)
			}


			if(!student.specialties.find(spciality => spciality.id === item.specialty_id)){
				student.specialties.push({
					id: item.specialty_id, 
					name: item.specialty_name
				})
			}

			if(!student.categories.find(category => category.id === item.category_id)){
				student.categories.push({
					id: item.category_id,
					name: item.category_name
				})
			}

		}

        //return dataStudent
        return listDatesStudent

    }
}


const body = {
    name: 'teste',  
    email: 'teste.teste@gmail.com', 
    phone: 31971222038, 
    cpf: 99999999999,
    document_id: 99999999, 
    birthdate: '2001-01-01',
    location: {
        cep: 31050520, 
        rua: "arthur de castro cunha",
        bairro: "acaiaca",
        numero: "325",
        Cidade: "Belo horizonte",
        estado: "Minas Gerais"
    },

    desired_license_category: ["A", "B"], 
    learning_goal: ["Primeira Habilitação"], 
    
}

//const repo = new StudentRepository()
//repo.insertStudent(body).then(response => console.log(response))
/* exemplo de resposta do banco
[
	{
		"student_id": 92,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-16T21:46:12.227Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 1,
		"category_name": "B"
	},
	{
		"student_id": 92,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-16T21:46:12.227Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 3,
		"category_name": "A"
	},
	{
		"student_id": 93,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-16T21:47:15.526Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 1,
		"category_name": "B"
	},
	{
		"student_id": 93,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-16T21:47:15.526Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 3,
		"category_name": "A"
	},
	{
		"student_id": 94,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-17T04:29:50.302Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 1,
		"category_name": "B"
	},
	{
		"student_id": 94,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-17T04:29:50.302Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 3,
		"category_name": "A"
	},
	{
		"student_id": 95,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-17T04:41:21.886Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 1,
		"category_name": "B"
	},
	{
		"student_id": 95,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-17T04:41:21.886Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 3,
		"category_name": "A"
	},
	{
		"student_id": 101,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-17T05:20:31.316Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 1,
		"category_name": "B"
	},
	{
		"student_id": 101,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-17T05:20:31.316Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 3,
		"category_name": "A"
	},
	{
		"student_id": 103,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-18T01:11:36.842Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 1,
		"category_name": "B"
	},
	{
		"student_id": 103,
		"student_name": "teste",
		"email": "teste.teste@gmail.com",
		"phone": 31971222038,
		"cpf": 99999999999,
		"document_id": 99999999,
		"birthdate": "2001-01-01",
		"location": "{\"cep\":31050520,\"rua\":\"arthur de castro cunha\",\"bairro\":\"acaiaca\",\"numero\":\"325\",\"Cidade\":\"Belo horizonte\",\"estado\":\"Minas Gerais\"}",
		"created_at": "2026-05-18T01:11:36.842Z",
		"specialty_id": 1,
		"specialty_name": "Primeira Habilitação",
		"category_id": 3,
		"category_name": "A"
	}
]
*/
