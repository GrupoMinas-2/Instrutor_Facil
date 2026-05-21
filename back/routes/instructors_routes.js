import express from 'express';
import { Router } from 'express';
import bodyParser from 'body-parser';
import {InstructorsRepository} from '../data/repositories/instructorsRepository.js'

const instructorRouter = Router();
instructorRouter.use(express.json())


instructorRouter.get('/', async (req , res) => {
    const repoInstructor = new InstructorsRepository()
    const instructors = await repoInstructor.getInstructors()

    res.json(instructors)
})


instructorRouter.get('/:id_Instructor', async (req , res) => {

    const repoInstructor = new InstructorsRepository()
    const instructor = await repoInstructor.getInstructorByID(Number(req.params.id_Instructor))
    
    res.json(instructor)

})


instructorRouter.post('/', async (req , res)=>{

    const objectInstructor = Object(req.body)
    const repoInstructor = new InstructorsRepository()

    const newInstructor = await repoInstructor.insertIntructor(objectInstructor)
    //console.log(objectInstructor)

    res.json(newInstructor)
})

export default instructorRouter