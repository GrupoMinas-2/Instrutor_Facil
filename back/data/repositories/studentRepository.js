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
        //const created_at = 23;
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
        //return [insertStudent, insertCategoriesAndStudent]
        //return [insertStudent, insertSpecialtiesAndStudent]
        //return insertStudent
        
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

        for( let iten of baseStudentsRelation){

            if(!listDataStudents[iten.student_id]){
                console.log(`passando por aqui`)
                listDataStudents.push({
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
                })
            }
        }
        

        return baseStudentsRelation 
    }
    
    async getStudentsById(){
        
    }
}

let teste = `categories.id,
categories.name` 


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
