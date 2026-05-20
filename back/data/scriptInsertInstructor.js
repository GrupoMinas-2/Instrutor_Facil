import { response } from 'express'
import fs from 'fs'

async function readJson(){

    /*const arquivoJson= await fs.readFile('back/data/repositories/listInstructor.json', (erro , data) => {
        
        if (!erro){
            return JSON.parse(data)
        }else{
            console.log(`erro: ${erro}`)
        }
    })*/

    const arquivoJson= await fs.readFile('back/data/repositories/listInstructor.json', 'utf-8')

    const dado = JSON.parse(arquivoJson)

    console.log(dado)

    //return arquivoJson
}

//readJson()

function readFileJson() {

    const conteudo = fs.readFileSync('back/data/listInstructor.json', 'utf-8');

    const dados = JSON.parse(conteudo);
    //const dados = conteudo;

    return dados

}

const listObjectsInstructors = readFileJson()
console.log(listObjectsInstructors)

const listResults = []

function executeInsertValues(){

    for (let iten of listObjectsInstructors){
        
        fetch('http://localhost:3333/instructor', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( iten )
            
            
        }).then( result => result.json() ).then( object => {
            console.log(object)
            listResults.push(object) 
        } )
    }
}

console.log(listResults)


//fetch('http://localhost:3333/instructors').then(result => result.json()).then(object => console.log(object))

