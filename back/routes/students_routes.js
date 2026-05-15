import express from 'express';
import bodyParser from 'body-parser';
import { StudentRepository } from '../data/repositories/studentRepository.js';

const app = express(); 

app.use(express.json());

app.post('/student', async (req, res)=> {
    const repoStudent = new StudentRepository();

    const objectStudent = Object(req.body);

    const newStudent = await repoStudent.insertStudent(objectStudent);

    //console.log(objectStudent);

    res.send(newStudent)
})

app.listen(3334); 