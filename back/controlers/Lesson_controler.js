import {ScheduleLesson} from '../usecases/agendar_aula.js'
import {SearchDrivingLessons} from '../usecases/buscar_aula.js'

export class ControlerLesson{

    #searchUseCase = new SearchDrivingLessons()
    #createUseCase = new ScheduleLesson()

    async createScheduling(request , response) {

        const listAcceptedkeys = [
            "instructorId",
            "studentId",
            "lessonDate",
            "startTime",
            "endTime",
            "price",
            "status",
            "lessonLocation",
            "notes",
        ]

        const listRequestKeys = Object.keys(request.body)

        const validateKeys = listRequestKeys.every(iten => listAcceptedkeys.includes(iten))

        if(validateKeys){
            const lessonParseObject = Object(request.body)

            const lesson ={
                instructorId: request.body.instructorId,
                studentId: request.body.studentId,
                lessonDate: request.body.lessonDate,
                startTime: request.body.startTime,
                endTime: request.body.endTime,
                price: request.body.price,
                status: request.body.status,
                lessonLocation: JSON.stringify(request.body.lessonLocation),
                notes: request.body.notes,
            }

            console.log(lesson)

            try {
                const result = await this.#createUseCase.createScheduling(lessonParseObject)
                response.status(200).json(result)
            } catch (error) {
                console.error(error)
                response.status(500).json({erro: error.mensage})
            }
        }

        response.status(400).json({erro: "body invalido! seguem os campos obrigatórios: 'instructorId','studentId','lessonDate','startTime','endTime','price','status','lessonLocation','notes','createdAt'," })

    }

    async searchLessons(request , response){
        
        try {
            const result = await this.#searchUseCase.searchlessons(null) 
            response.json(result)

        } catch (error) {
            console.error(error)
            response.status(500).json({erro: error.message})
        }

    }

    async searchLessonsByID(request, response){

        const idLesson = Number(request.params.idLesson)
        try {
            const result = await this.#searchUseCase.searchlessons(idLesson) 
            response.json(result)

        } catch (error) {
            console.error(error)
            response.status(500).json({erro: error.message})
        }
    }
    
    async searchLessonsByStudents(request , response){

        const idStudent = Number(request.params.idStudent)
        try {
            const result = await this.#searchUseCase.searchlessonsByUsers(idStudent) 
            response.json(result)

        } catch (error) {
            console.error(error)
            response.status(500).json({erro: error.message})
        }

    }

    async searchLessonsByInstructor(request , response){

        const idInstructor = Number(request.params.idInstructor)
        try {
            const result = await this.#searchUseCase.searchlessonsByUsers(null, idInstructor)
            response.status(200).json(result)
        } catch (error) {
            console.error(error)
            response.status(500).json({erro: error.message})
        }
    }



}