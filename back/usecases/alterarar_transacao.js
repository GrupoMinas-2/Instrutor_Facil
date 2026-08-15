import { FinancialRepository } from "../data/repositories/financialRepository.js";

class UpdateRecordTransaction{

    #financialRepo= new FinancialRepository() 

    async changeStatus(idRecord, statusPament){
        
        if (typeof statusPament === "string" && typeof idRecord === "number"){
            const adjustedStatus= statusPament.toUpperCase()
            const objectUpdateRecord= {
                status: statusPament
            }

            return await this.#financialRepo.modifyRecordTransaction(idRecord, objectUpdateRecord, "pach")
        }

        return "não é possivel alterar o status! id do registro deve ser um número e o status deve ser uma string!"

    }
}

const use_case = new UpdateRecordTransaction()

use_case.changeStatus(2, "REJECTED").then(iten => console.log(iten))