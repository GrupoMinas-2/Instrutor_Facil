import { json } from "express";
import { DbAcess } from "../database_acess.js"; 

export class DrivingLessonRepository {

    database = new DbAcess()

    callbackLesson(success, dataSearch, actionQuery, resultIsAllray= false){
        let response 

        if (success){
            response = {
                status: 'suceso',
                action: actionQuery,
                amount_itens: resultIsAllray? dataSearch.length: 1, 
                drive_leasons: dataSearch
            }
        }else {
            response = {
                status: 'erro',
                action: actionQuery, 
                mensage: dataSearch
            }
        }
        return response
    }

    async insertDrivingLesson (objectLesson){

        const queryInsertLesson = ` INSERT INTO lessons (instructor_id, student_id, lesson_date, start_time, end_time, price, status, lesson_location, notes, created_at) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?)` 

        const valuesLesson =  [objectLesson.instructorId, objectLesson.studentId, objectLesson.lessonDate,objectLesson.startTime, objectLesson.endTime, objectLesson.price, objectLesson.status,objectLesson.lessonLocation, objectLesson.notes, objectLesson.createdAt]

        try {
            const drivingLesson = await this.database.setData_one(queryInsertLesson, valuesLesson)
            return this.callbackLesson(true, drivingLesson, "REGISTRAR_AULA")
            
        } catch (error) {
            return this.callbackLesson(false, error, "REGISTRAR_AULA")
        }

    }

    async getListDrivingLesson (){
        const queryGetLessons = `SELECT * FROM lessons`
        try {
            const listDrivingLessons = await this.database.readData_all(queryGetLessons)
            return this.callbackLesson(true, listDrivingLessons, "BUSCA_TODAS_AULAS", true)

        } catch (error) {
            return this.callbackLesson(false, error, "BUSCA_TODAS_AULAS")
        }
    }

    async getDrivingLessonByID(idDrivingLesson= null, idIstructor= null) {
        
        const queryGetLesson= `SELECT * FROM lessons WHERE id = ?`
        const idForSearch = idDrivingLesson

        try {
            const lesson = await this.database.readData_one(queryGetLesson, idForSearch)
            return this.callbackLesson(true, lesson, "BUSCA_AULA_POR_ID")
        
        } catch (error) {
            return this.callbackLesson(false, error, "BUSCA_AULA_POR_ID")   
        }
    }

    async getDrivingLessonForUsers(idStudent= null, idIstructor= null) {
        let  queryGetLesson 
        let  idForSearch 

        if(idStudent && typeof idStudent == "number"){
            queryGetLesson= `SELECT * FROM lessons WHERE student_id = ? `
            idForSearch = idStudent

        }else if(idIstructor && typeof idIstructor == "number"){
            queryGetLesson=  `SELECT * FROM lessons WHERE instructor_id = ?`
            idForSearch = idIstructor
        }

        try {
            const lessons = await this.database.readData_all(queryGetLesson, idForSearch)
            return this.callbackLesson(true, lessons, "AULAS_POR_USUARIO", true)
        
        } catch (error) {
            return this.callbackLesson(false, error, "AULAS_POR_USUARIO")  
        }
    }
}


const respository = new DrivingLessonRepository()
const testeleason =  {
    instructorId: 2,
    studentId: 3,
    lessonDate: 'yyyy-mm-dd',
    startTime: 'hh:mm',
    endTime: 'hh:mm',
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
    createdAt: 'yyyy-mm-dd|hh:mm'
}

//respository.insertDrivingLesson(testeleason).then(iten => console.log(iten))
//respository.getListDrivingLesson().then(iten => console.log(iten))
//respository.getDrivingLessonByID(2).then(iten => console.log(iten))
//respository.getDrivingLessonForUsers(3, null).then(iten => console.log(iten))