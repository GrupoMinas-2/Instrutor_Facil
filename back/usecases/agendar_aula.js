/*
Busca de disponibilidade
 [x] O sistema devera consultar a disponibilidade do instrutor baseada em seus horários livres
 [x] O sistema levará em consideração a disponibilidade de dias e horários de atuação do instrutor.
 [x] O sistema deve verificar os agendamentos desse mesmo instrutor em dias e horas
 [ ] O sistema deve exibir apenas os horários disponíveis encontrados no banco
 [ ] O sistema deve consultar a disponibilidade do instrutor após o aluno confirmar o agendament
*/

import { DrivingLessonRepository } from "../data/repositories/drivinglessonRepository.js"; 
import { InstructorsRepository } from "../data/repositories/instructorsRepository.js";
import { StudentRepository } from "../data/repositories/studentRepository.js" 

export class ScheduleLesson{

    lessonReopo = new DrivingLessonRepository() 
    instructorsRepo = new InstructorsRepository()
    studentRepo = new StudentRepository()

    async checkAvailabilityOfInstructor(scheduling){

        function replaceHours(value){

            if(Array.isArray(value)){
                let listReplace = []
                for(let iten of value){
                    const primeValue = iten.trim()
                    const unitHour= primeValue.split(':')
                    const realTime= unitHour.join('.')
                    listReplace.push(Number(realTime))        
                }
                return listReplace
            }

            const primeValue = value.trim()
            const unitHour= primeValue.split(':')
            const realTime= unitHour.join('.')
            
            return Number(realTime)
        }

        function validateHour(time, timeCompare, inside = true ){

            if (!inside){
                const start = (time.init < timeCompare.init) && (time.final <= timeCompare.init)? true : false
                const end= (time.init >= timeCompare.final) && (time.final > timeCompare.final)? true: false
                
                if(start || end){
                return true
                }

                return false
            }

            const start = (time.init >= timeCompare.init) && (time.final > timeCompare.init)? true : false
            const end= (time.init < timeCompare.final) && (time.final <= timeCompare.final)? true: false

            if(start && end){
                return true
            }

            return false
        }
        
        const instructorId = scheduling.instructorId
        const instructorLessons= await this.lessonReopo.getDrivingLessonForUsers(null, instructorId)
        let instructorLessonsTimes 

        if(instructorLessons.drive_lessons.length){    
            instructorLessonsTimes= instructorLessons.drive_lessons.map( iten =>{
                return{
                    init: replaceHours(iten.start_time),
                    final: replaceHours(iten.end_time)
                }
            })
        }

        const schedulingDate = new Date(scheduling.lessonDate)
        const schedulingDayWeek = schedulingDate.getUTCDay()
        const schedulingTime ={
            init: replaceHours(scheduling.startTime),
            final: replaceHours(scheduling.endTime)
        }

        const availability = await this.instructorsRepo.getInstructorAvailabilityById(instructorId)
        const availabilityDaysWeek = availability.days_week
        const availabilityBlockedDays= availability.blocked_days.map(iten => new Date(iten))
        const availabilityWorkTime = {
            init: replaceHours(availability.working_time.init),
            final: replaceHours(availability.working_time.final)
        }
        const availabilityLunchTime = {
            init: replaceHours(availability.lunchtime.init), 
            final: replaceHours(availability.lunchtime.final)
        }

        
        const validateBlokedDays = availabilityBlockedDays.find(iten => iten.getTime() === schedulingDate.getTime())
        const validateDaysWeek = availabilityDaysWeek.find(iten => iten.id === schedulingDayWeek) 

        const validateWorkigHour = validateHour(schedulingTime, availabilityWorkTime)
        const validatelunchHour = validateHour(schedulingTime, availabilityLunchTime, false)
        
        let validateAppointments
        
        if(instructorLessons.drive_lessons.length){
            validateAppointments = instructorLessonsTimes.find(iten => validateHour(schedulingTime, iten))
        }

        
        if(validateBlokedDays || !validateDaysWeek){
            return {
                available: false,
                mensage: `Data ${scheduling.lessonDate} indisponivel para agendamento de aulas`,
                blocked_days: availabilityBlockedDays, 
                days_week: availabilityDaysWeek
            }
        }
        if((!validateWorkigHour && !validatelunchHour) || validateAppointments){
            return {
                available: false,
                mensage: `Horario (${scheduling.startTime} a ${scheduling.endTime}) indisponivel para agendamento de aulas`,
                working_time: availabilityWorkTime,
                lunch_time: availabilityLunchTime
            }
        }

        return {
            available: true,
            mensage: "Data e horario disponivel para agendamento de aulas",
        }
        
    }

    async createScheduling(schedulingSelected) {
      
        const validateAvailability = await this.checkAvailabilityOfInstructor(schedulingSelected)

        if(validateAvailability.available){
            
            const lesson= await this.lessonReopo.insertDrivingLesson(schedulingSelected)
            
            // --> registro financeiro <--

            return {
                mensage: 'Agendamento criado',
                check_availability: validateAvailability, 
                create_scheduling: lesson
            }
        }

        return {
            mensage: 'Falha ao agendar nova aula',
            reason: validateAvailability
        }

    }

}

const usecase = new ScheduleLesson()

const testeleason =  {
        instructorId: 10, // passado pla rota 
        studentId: 93, // passado pela rota 
        lessonDate: '2026-07-20', // selecionado no front
        startTime: '10:00', // selecionado no front
        endTime: '10:30', // selecionado no front
        price: 99.00 , // somado pelo número de aulas, dado passado pelo front
        status: 'ABERTO', // resultado 
        lessonLocation:`{ 
            "cep": 39629971,
            "rua": "Praça Sagrada Família, s/n",
            "bairro": "centro",
            "numero": "342",
            "Cidade": "Água Branca de Minas",
            "estado": "Minas Gerais"
        }`, // valor reconhecido pelo CEP
        notes: "comentário", 
        createdAt: 'yyyy-mm-dd|hh:mm' // data da criação
    }

//usecase.checkAvailabilityOfInstructor(testeleason).then(iten=> console.log(iten))
//usecase.createScheduling(testeleason).then(iten=> console.log(iten))