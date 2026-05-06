import express from 'express';
import {InstructorsRepository} from '../data/repositories/instructors.js'

const app = express();

app.get('/instructors/:id_Instructor', async (req , res) => {

    const repoInstructor = new InstructorsRepository()
    const instructor = await repoInstructor.getInstructorByID(Number(req.params.id_Instructor))
    
    res.json(instructor)

})

app.post('/instructors', (req , res)=>{
    res.send({mensage : 'teste'})
})

app.listen(3333); 