import express from 'express';
import bodyParser from 'body-parser';
import {InstructorsRepository} from '../data/repositories/instructors.js'

const app = express();
app.use(express.json())


app.get('/instructors', async (req , res) => {
    const repoInstructor = new InstructorsRepository()
    const instructors = await repoInstructor.getInstructors()

    res.json(instructors)
})


app.get('/instructors/:id_Instructor', async (req , res) => {

    const repoInstructor = new InstructorsRepository()
    const instructor = await repoInstructor.getInstructorByID(Number(req.params.id_Instructor))
    
    res.json(instructor)

})


app.post('/instructors', async (req , res)=>{

    const objectInstructor = Object(req.body)
    const repoInstructor = new InstructorsRepository()

    const newInstructor = await repoInstructor.insertIntructor(objectInstructor)
    //console.log(objectInstructor)

    res.json(newInstructor)
})

app.listen(3333); 