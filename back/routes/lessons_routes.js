import {Router , json} from 'express'
import express from 'express'
import {ControlerLesson} from '../controlers/Lesson_controler.js'
const lessonRouter = Router()
const control = new ControlerLesson()
lessonRouter.use(express.json())


lessonRouter.get('/', control.searchLessons.bind(control))

lessonRouter.get('/:idLesson', control.searchLessonsByID.bind(control))

lessonRouter.get('/student/:idStudent', control.searchLessonsByStudents.bind(control)) 

lessonRouter.get('/instructor/:idInstructor', control.searchLessonsByInstructor.bind(control))

lessonRouter.post('/', control.createScheduling.bind(control))

export default lessonRouter