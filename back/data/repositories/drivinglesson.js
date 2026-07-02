import { DbAcess } from "../database_acess.js"; 

export class DrivingLessonRepository {

    database = new DbAcess()

    async insertDrivingLesson (objectLesson){

        const queryInsertLesson = ` INSERT INTO lessons (instructor_id, student_id, lesson_date, start_time, end_time, price, status, lesson_location, notes, created_at) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)` 

        const valuesLesson =  [objectLesson.instructorId, objectLesson.studentId, objectLesson.lessonDate,objectLesson.startTime, objectLesson.endTime, objectLesson.price, objectLesson.status,objectLesson.lessonLocation, objectLesson.notes, objectLesson.createdAt]

        try {
            const drivingLesson = await this.database.setData_one(queryInsertLesson, valuesLesson)
            return drivingLesson
            
        } catch (error) {
            return {
                status: 'erro',
                mensage: `${error}`
            }
        }

    }

    async getListDrivingLesson (){

    }

    async getDrivingLessonByID() {

    }

}

const respository = new DrivingLessonRepository()


const testeleason =  {
    instructorId: 1,
    studentId: 1 ,
    lessonDate: 'yyyy-mm-dd',
    startTime: 'hh-mm',
    endTime: 'hh-mm',
    price: 99.00 ,
    status: 'ABERTO',
    lessonLocation:`{
        "cep": 39629971,
        "rua": "Praça Sagrada Família, s/n",
        "bairro": "centro",
        "numero": "342",
        "Cidade": "Água Branca de Minas",
        "estado": "Minas Gerais"
    }`,
    notes: "cmentário",
    createdAt: 'yyyy-mm-dd|hh-mm'
}

respository.insertDrivingLesson(testeleason).then(iten => console.log(iten))