import { DrivingLessonRepository } from "../data/repositories/drivinglessonRepository.js";
import { InstructorsRepository } from "../data/repositories/instructorsRepository.js";
import { StudentRepository } from "../data/repositories/studentRepository.js";

export class SearchDrivingLessons{
    #lessonRepo = new DrivingLessonRepository()
    #instructorRepo = new InstructorsRepository()
    #studentRepo = new StudentRepository()
    

    async searchlessons(idLesson){

        let listLessons = [] 

        if(idLesson && typeof idLesson === 'number') {

            const lessons= await this.#lessonRepo.getDrivingLessonByID(idLesson)

            const studentForLesson= await this.#studentRepo.getStudentsById(lessons.drive_lessons.student_id)
            
            const instructorForLesson= await this.#instructorRepo.getInstructorByID(lessons.drive_lessons.instructor_id, false, false)

            return {
                lessons: lessons, 
                relations:{
                    student: studentForLesson,
                    instructor: instructorForLesson
                }
            }
            
        }

        
        const lessons= await this.#lessonRepo.getListDrivingLesson()
        let listResponseLessons = []
        for(let iten of lessons.drive_lessons){
            const studentForLesson= await this.#studentRepo.getStudentsById(iten.student_id)
            
            const instructorForLesson= await this.#instructorRepo.getInstructorByID(iten.instructor_id, false, false)

            listResponseLessons.push( {
                lesson: iten, 
                relations:{
                    student: studentForLesson,
                    instructor: instructorForLesson
                }
            })
        }

        return listResponseLessons
    }

    async searchlessonsByUsers(idStudent, idIstructor = null){

        if(idStudent){
            const lessons = await this.#lessonRepo.getDrivingLessonForUsers(idStudent)
            const studentLesson = await this.#studentRepo.getStudentsById(idStudent)

            return {
                lessons: lessons, 
                relations:{
                    student: studentLesson,
                }
            }
        }

        const lessons = await this.#lessonRepo.getDrivingLessonForUsers(false, idIstructor)
        const instructorLesson = await this.#instructorRepo.getInstructorByID(idIstructor, false, false)

        return {
            lessons: lessons, 
            relations:{
                instructor: instructorLesson,
            }
        }
    }
}

const search = new SearchDrivingLessons()

//search.searchlessons().then(iten => { console.log(iten) })

//search.searchlessonsByUsers(false, 10).then(iten => console.log(iten))