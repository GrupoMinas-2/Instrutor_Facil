import { FinancialRepository } from "../data/repositories/financialRepository.js";
import {SearchDrivingLessons} from "./buscar_aula.js"
import { DrivingLessonRepository } from "../data/repositories/drivinglessonRepository.js";

class SearchRecordTransaction{
    #financialRepo= new FinancialRepository()
    #lessonUseCase= new SearchDrivingLessons()

    async searchRecords(){ 
        
        const resultSearch = await this.#financialRepo.getRecordTransactions()
        const records = resultSearch.record_transaction
        
        if(Array.isArray(records)){

            const listRecords = Promise.all(records.map(async (iten) =>{ 
                const lessonOfRecord= await this.#lessonUseCase.searchlessons(iten.lesson_id)
                const newIten={
                    ...iten,
                    ...lessonOfRecord
                }
                return {
                    ...newIten
                }
                
            }))

            return listRecords
        }

        return{
            status: "erro",
            mensage: "falha ao encontrar as transações"
        }

    }

    async searchRecordByID(idRecord){

        if (idRecord && typeof idRecord === "number"){
            const resultSearch = await this.#financialRepo.getRecordTransactionByID(idRecord)
            const idLesson = resultSearch.record_transaction[0].lesson_id

            const lessonOfRecord = await this.#lessonUseCase.searchlessons(idLesson)
            
            return {
                ...resultSearch,
                ...lessonOfRecord
            }
        }

        return{
            status: "erro",
            mensage:   `o id ${idRecord}, não é um id valido para busca`
        }

    }

    async searchRecordByLesson(idLesson){

        if (idLesson && typeof idLesson === "number"){
            const resultSearch = await this.#financialRepo.getRecordTransactionByID(null, idLesson)

            const lessonOfRecord = await this.#lessonUseCase.searchlessons(idLesson)
            
            return {
                ...resultSearch,
                ...lessonOfRecord
            }
        }

        return{
            status: "erro",
            mensage:   `o id ${idLesson}, não é um id valido para busca`
        }

    }

}

const use_case= new SearchRecordTransaction()

//use_case.searchRecords().then(iten => console.log(iten))
//use_case.searchRecordByID(2).then(iten => console.log(iten))
//use_case.searchRecordByLesson(1).then(iten => console.log(iten))