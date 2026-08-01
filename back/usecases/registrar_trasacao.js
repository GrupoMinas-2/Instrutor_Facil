import {FinancialRepository} from "../data/repositories/financialRepository.js" 
import {DrivingLessonRepository} from "../data/repositories/drivinglessonRepository.js"

class FinancialRecord{

    #financialRepo = new FinancialRepository()
    #lessonRepo = new DrivingLessonRepository()

    registerTrasaction(objectTransaction){
        
        const newTrasaction= this.#financialRepo.createRecordTransactions(objectTransaction)

        const lessonOfTransaction= this.#lessonRepo.getDrivingLessonByID(objectTransaction.idLesson)

        return {
            response: newTrasaction,
            lesson: lessonOfTransaction
        }

    }

}