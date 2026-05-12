import { DbAcess } from "../database_acess";

export class StudentRepository {


    async insertStudent(student){
        const queryInsertStudent = `INSERT INTO students (name, email, phone, cpf, document_id, birthdate, location, created_at ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`; 

        const valueStudent = [ ]

        const body = {
            "id": 1,
            "name": 'teste',  
            "email": 'teste.teste@gmail.com', 
            "phone": 31971222038, 
            "cpf": 99999999999,
            "document_id": 99999999, 
            "birthdate": '2001-01-01',
            "location": {
                "cep": 31050520, 
		        "rua": "arthur de castro cunha",
		        "bairro": "acaiaca",
		        "numero": "325",
		        "Cidade": "Belo horizonte",
		        "estado": "Minas Gerais"
	        },
            "desired_license_category":["A", "B"], 
            "learning_goal": ["primeira Habilitação"], 
            "created_at": '11/05/2026'
        }
    }

    async getStudents(){

    }

    async getStudentsById(){

    }
}