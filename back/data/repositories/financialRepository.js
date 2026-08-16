import { DbAcess } from "../database_acess.js";

export class FinancialRepository{

    #dataAcess = new DbAcess()

    #callbackRecord(success, dataSearch, actionQuery, resultIsAllray= false){
        let response 

        if (success){
            response = {
                status: 'suceso',
                action: actionQuery,
                amount_itens: resultIsAllray? dataSearch.length: 1, 
                record_transaction: dataSearch
            }
        }else {
            response = {
                status: 'erro',
                action: actionQuery, 
                mensage: dataSearch
            }
        }
        return response
    }


    async createRecordTransactions (objectTransaction){

        const queryRecord= `INSERT INTO payments (lesson_id, amount, method, status, paid_at, type, value) VALUES (?,?,?,?,?,?,?)`

        const createdAt= new Date()

        const valueRecord= [
            objectTransaction.idLesson,
            objectTransaction.amount, 
            objectTransaction.method, 
            "OPPEN", 
            createdAt.toLocaleString(), 
            objectTransaction.type,
            objectTransaction.value
        ]

        try {
            const records= await this.#dataAcess.setData_one(queryRecord, valueRecord)
            return this.#callbackRecord(true, records, "REGISTRAR_TRANSACAO")

        } catch (error) {
            return this.#callbackRecord(false, error, "REGISTRAR_TRANSACAO")
        }
    }


    async getRecordTransactions(){
        const querySelectRecord = 'SELECT * FROM payments'
        try {
            const records = await this.#dataAcess.readData_all(querySelectRecord)
            return this.#callbackRecord(true, records, 'BUSCAR_TODOS_REGISTROS', true)
        } catch (error) {
            return this.#callbackRecord(true, error, 'BUSCAR_TODOS_REGISTROS')
        }
    }


    async getRecordTransactionByID(idRecord, idLesson= null){
        let querySelectRecord
        let idSearch 
        
        if(idRecord && !idLesson){
            querySelectRecord = 'SELECT * FROM payments WHERE id = ?'
            idSearch = idRecord
        }
        if(idLesson && !idRecord){
            querySelectRecord= 'SELECT * FROM payments WHERE lesson_id = ?'
            idSearch= idLesson
        }

        try {
            const records = await this.#dataAcess.readData_all(querySelectRecord,idSearch)
            return this.#callbackRecord(true, records, 'BUSCAR_REGISTRO_TRASACAO', true)
        } catch (error) {
            return this.#callbackRecord(false, error, 'BUSCAR_REGISTRO_TRASACAO')
        }
    }

    async modifyRecordTransaction(idRecord, objectNewRecord, typeAction){

        
        const tableColuns = [
            "lesson_id",
            "amount", 
            "method", 
            "status",
            "type", 
            "value"
        ]
        
        const colunsModify= tableColuns.filter(iten => {
            if (Object.keys(objectNewRecord).includes(iten)){
                return true
            }
            return false
        })
        
        if (typeAction === "pach" && colunsModify.length > 0 ){
            
            const columnsForQuery = colunsModify.map(iten => `${iten} = ?`) 
            
            const queryModfy= `UPDATE payments SET ${columnsForQuery} WHERE id = ?`
            const valueModify = Object.values(objectNewRecord)
            valueModify.push(idRecord)
            
            try {
                const modified = await this.#dataAcess.setData_one(queryModfy, valueModify)
                return this.#callbackRecord(true, modified, "ALTERAR_REGISTRO_TRASACAO")
            } catch (error) {
                return this.#callbackRecord(false, error, "ALTERAR_REGISTRO_TRASACAO")
            }
        }

        if(typeAction === "replace" && colunsModify.length === tableColuns.length){

            const columnsForQuery = tableColuns.map(iten => `${iten} = ?`)
            const queryModfy= `UPDATE payments SET ${columnsForQuery} WHERE id = ?`
            const valueModify = Object.values(objectNewRecord)
            valueModify.push(idRecord)

            try {
                const modified = await this.#dataAcess.setData_one(queryModfy, valueModify)
                return this.#callbackRecord(true, modified, "ALTERAR_REGISTRO_TRASACAO")
            } catch (error) {
                return this.#callbackRecord(false, error, "ALTERAR_REGISTRO_TRASACAO")
            }
        }

        const erro ="não foi possivel realizar a alteração! Confira o tipo de alteração setado e os campos do objeto de alteração!"
        return this.#callbackRecord(false, erro, "ALTERAR_REGISTRO_TRASACAO")

    }

}

const registro = new FinancialRepository()

const objeto = {
    lesson_id: 14,
    amount: 1,
    method: "CARTAO_DEBITO",
    type: "LESSON_PAYMENT",
    value: 90.50
}
const objetoMudanca = {
    lesson_id: 2,
    amount: 4, 
    method: "PIX", 
    status: "COMPLETED",
    type: "LESSON_PAYMENT", 
    value: 90
}

/* types: 
    LESSON_PAYMENT

    PLATFORM_COMMISSION

    INSTRUCTOR_TRANSFER

    REFUND 
*/
/* status: 
    OPPEN 
    PENDING
    ON_REVIEW 
    ACCEPTED
    REJECTED
    CANCELLED
    COMPLETED
*/ 

//registro.recordTransactions(objeto).then(iten => console.log(iten))
//registro.getRecordTransactionByID(null, 14).then(iten => console.log(iten))
//registro.getRecordTransactions().then(iten => console.log(iten))
//registro.modifyRecordTransaction(1,objetoMudanca, "replace" ).then(iten => console.log(iten))