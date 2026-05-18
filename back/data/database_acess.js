import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { json } from 'express';


export class DbAcess{ 

    async setData_one (query , value) {
        const db = await open({
            filename: 'back/data/base.db',
            driver: sqlite3.Database
        })
        
        let result= await db.run(query, value);
        
        return result
    };

    async setData_all(query, value = null){
        const db = await open({
            filename: 'back/data/base.db',
            driver: sqlite3.Database
        })
        return db.run(query, value);
    }

    async readData_one(query, value){
        const db = await open({
            filename: 'back/data/base.db',
            driver: sqlite3.Database
        })
        return db.get(query, value);
    }

    async readData_all(query, value){
        const db = await open({
            filename: 'back/data/base.db',
            driver: sqlite3.Database
        })
        if(value){
            return db.all(query, value);
        }else{
            return db.all(query)
        }
    }
};



async function createTables(){

    const db =  await open({
        filename: 'back/data/base.db',
        driver: sqlite3.Database 
    }); 

    db.run(
        `CREATE TABLE IF NOT EXISTS instructors (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            image_profile TEXT,
            rating REAL,
            total_lessons INTEGER,
            experience INTEGER,
            location TEXT,
            price_per_hour REAL,
            bio TEXT,
            availability TEXT, -- JSON
            car_model TEXT
        )`
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS specialties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        );`
    )

    db.run(
        `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE   
        );`
    )

    db.run(
        `CREATE TABLE IF NOT EXISTS instructor_specialties (
            instructor_id INTEGER,
            specialty_id INTEGER,
            PRIMARY KEY (instructor_id, specialty_id),
            FOREIGN KEY (instructor_id) REFERENCES instructors(id),
            FOREIGN KEY (specialty_id) REFERENCES specialties(id) 
        );`
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS instructor_categories (
            instructor_id INTEGER,
            category_id INTEGER,
            PRIMARY KEY (instructor_id, category_id),
            FOREIGN KEY (instructor_id) REFERENCES instructors(id),
            FOREIGN KEY (category_id) REFERENCES categories(id) 
        );`
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL, 
            phone INTEGER,
            cpf INTEGER,
            document_id INTEGER, 
            birthdate TEXT NOT NULL, 
            location TEXT, -- JSON
            created_at TEXT
        )`
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS student_categories (
            student_id INTEGER,
            category_id INTEGER,
            PRIMARY KEY (student_id, category_id),
            FOREIGN KEY (student_id) REFERENCES students(id),
            FOREIGN KEY (category_id) REFERENCES categories(id) 
        );`
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS student_specialties (
            student_id INTEGER,
            specialty_id INTEGER,
            PRIMARY KEY (student_id, specialty_id),
            FOREIGN KEY (student_id) REFERENCES student(id),
            FOREIGN KEY (specialty_id) REFERENCES specialties(id) 
        );`
    );

    const body = {
        "id": 1,
        "name": 'teste',  
        "email": 'teste.teste@gmail.com', 
        "phone": 31971222038, 
        "cpf": 99999999999,
        "document_id": 99999999, 
        "birthdate": '2001-01-01',
        "location": {
            "cep": 31050520, 
            "rua": "arthur de castro cunha",
            "bairro": "acaiaca",
            "numero": "325",
            "Cidade": "Belo horizonte",
            "estado": "Minas Gerais"
        },
        "desired_license_category":["A", "B"], 
        "learning_goal": ["primeira Habilitação"], 
        "created_at": '11/05/2026'
    }
    //console.log(instructors)
};

async function insertInstructors(instructor){
    
    db =  await open({
        filename: './data/base.db',
        driver: sqlite3.Database 
    }); 

        db.run(` 
            INSERT INTO instructors (name, image_profile, rating, total_lessons, experience, location, price_per_hour, bio, availability, car_model)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING*
    `, [instructor.name,
        instructor.profileImage, 
        instructor.rating,
        instructor.totalLessons,
        instructor.experience,
        instructor.location,
        instructor.pricePerHour,
        instructor.bio,
        instructor.availability,
        instructor.carModel]
    );
};

async function insertOtherDatas () {
    const db = await open({
        filename: 'back/data/base.db',
        driver: sqlite3.Database
    });
    /*
        db.run(`INSERT INTO categories(name) VALUES ('B'), ('AB')`);

        db.run(`INSERT INTO categories(name) VALUES ('A')`);
        
        db.run(`INSERT INTO specialties(name) VALUES
                ('Baliza'),
                ('Direção Defensiva'), ('Reciclagem'), 
                ('Moto'), ('Estacionamento')
        `);
    */
};

/* instructors.forEach(element => {
    let instructorInsert= {
        name: element.name,
        profileImage: element.photo,
        rating: element.rating,
        totalLessons:element.totalLessons,
        experience: element.experience,
        location: element.location,
        pricePerHour: element.pricePerHour,
        bio: element.bio,
        availability: element.availability,
        carModel: element.carModel
    }; 

    insertInstructors(instructorInsert)
}); */
/* id: '3',
    name: 'Roberto Almeida',
    photo: 'https://images.unsplash.com/photo-1770058428159-50cca6566c19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBtYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzc1MTgwMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    totalLessons: 891,
    experience: 20,
specialties: ['Primeira Habilitação', 'Direção Noturna', 'Estradas'],
    location: 'São Paulo - Zona Norte',
    pricePerHour: 90,
    bio: 'Veterano no ensino de direção veicular. Mais de 20 anos formando condutores responsáveis e seguros. Especialista em preparação completa para todas as situações de trânsito.',
    availability: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    carModel: 'Volkswagen Jetta 2021',
categories: ['B', 'AB'],
  }, */


//createTables()
//insertInstructors()
//insertOtherDatas()