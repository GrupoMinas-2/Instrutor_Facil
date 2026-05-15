import { DbAcess } from "../database_acess.js";
import { InstructorsRepository } from "./instructorsRepository.js";

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
        {id: 2, name: 'AB'}
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

        let queryStudentCategories = `INSERT INTO student_specialties (student_id, specialty_id) VALUES ${learningPlaceHolder}`;
        let queryStudentLearning = `INSERT INTO student_specialties (student_id, categories_id) VALUES ${studentDesiredCategory}`; 

        const valuesStudentLearning= [];
        const valuesStudentCategories= [];

        for (let item in valuesStudentLearning){
            valuesStudentLearning.push(insertStudent.lastID, studentLearning[item].id);
        }
        for (let item in valuesStudentCategories){
            valuesStudentCategories.push(insertStudent.lastID, studentDesiredCategory[item].id);
        }

        const insertSpecialtiesAndStudent = await this.database.setData_one(queryStudentLearning, valuesStudentLearning);
        const insertCategoriesAndStudent = await this.database.setData_one(queryStudentCategories, valuesStudentCategories); 
        
        
        //return [insertStudent, insertCategoriesAndStudent, insertSpecialtiesAndStudent]
        return insertStudent
        
    }
    
    async getStudents(){
        
    }
    
    async getStudentsById(){
        
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
    learning_goal: ["primeira Habilitação"], 
    
}
const repo = new StudentRepository()

//repo.insertStudent(body)