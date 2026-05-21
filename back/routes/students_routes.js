import express from 'express';
import { Router } from 'express';
import bodyParser from 'body-parser';
import { StudentRepository } from '../data/repositories/studentRepository.js';

const studentRouter = Router(); 

studentRouter.use(express.json());


studentRouter.post('/', async (req, res)=> {
    
    const repoStudent = new StudentRepository();
    const objectStudent = Object(req.body);
    const newStudent = await repoStudent.insertStudent(objectStudent);

    console.log(newStudent);

    res.json(newStudent);
})


studentRouter.get('/', async (req , res)=> {
    
    const repoStudent = new StudentRepository(); 
    const listStudents = await repoStudent.getStudents(); 
    
    res.json(listStudents);
})

studentRouter.get('/:idStudent', async (req, res) => {
    const repoStudent = new StudentRepository()
    const idStudent = Number(req.params.idStudent)
    const searchStudentById = await repoStudent.getStudentsById(idStudent)

    res.json(searchStudentById)
})


export default studentRouter