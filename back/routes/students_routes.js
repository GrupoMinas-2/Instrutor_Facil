import express from 'express';
import bodyParser from 'body-parser';
import { StudentRepository } from '../data/repositories/studentRepository.js';

const app = express(); 

app.use(express.json());


app.post('/student', async (req, res)=> {
    
    const repoStudent = new StudentRepository();
    const objectStudent = Object(req.body);
    const newStudent = await repoStudent.insertStudent(objectStudent);

    console.log(newStudent);

    res.json(newStudent);
})


app.get('/students', async (req , res)=> {
    
    const repoStudent = new StudentRepository(); 
    const listStudents = await repoStudent.getStudents(); 
    
    res.json(listStudents);
})

app.get('/student/:idStudent', async (req, res) => {
    const repoStudent = new StudentRepository()
    const idStudent = Number(req.params.idStudent)
    const searchStudentById = await repoStudent.getStudentsById(idStudent)

    res.json(searchStudentById)
})

app.listen(3333); 