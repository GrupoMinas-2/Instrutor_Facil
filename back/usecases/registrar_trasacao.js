import {FinancialRepository} from "../data/repositories/financialRepository.js" 
import {SearchDrivingLessons} from "./buscar_aula.js"

class FinancialRecord{

    #financialRepo = new FinancialRepository()
    #lessonUseCase= new SearchDrivingLessons()

    async registerTrasaction(objectTransaction){
        
        const newTrasaction= await this.#financialRepo.createRecordTransactions(objectTransaction)

        const lessonOfTransaction= await this.#lessonUseCase.searchlessons

        return {
            response: newTrasaction,
            lesson: lessonOfTransaction
        }

    }

}

const use_case= new FinancialRecord()

const objeto = {
    lesson_id: 13,
    amount: 1,
    method: "CARTAO_DEBITO",
    type: "LESSON_PAYMENT",
    value: 90.50
}

use_case.registerTrasaction(objeto).then(iten => console.log(iten))