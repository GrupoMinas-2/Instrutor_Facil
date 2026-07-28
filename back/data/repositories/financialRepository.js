import { DbAcess } from "../database_acess.js";

class Financial{

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


    async recordTransactions (objectTransaction){

        const queryRecord= `INSERT INTO payments (lesson_id, amount, method, status, paid_at, type, value) VALUES (?,?,?,?,?,?,?)`

        const createdAt= new Date()

        const valueRecord= [
            objectTransaction.idLesson,
            objectTransaction.amount, 
            objectTransaction.method, 
            "OPPEN", 
            createdAt, 
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
            return this.#callbackRecord(true, error, 'BUSCAR_REGISTRO_TRASACAO')
        }
    }

}

const registro = new Financial()

const objeto = {
    idLesson: 14,
    amount: 1,
    method: "CARTAO_DEBITO",
    type: "LESSON_PAYMENT",
    value: 90.50
}

//registro.recordTransactions(objeto).then(iten => console.log(iten))
//registro.getRecordTransactionByID(null, 14).then(iten => console.log(iten))
registro.getRecordTransactions().then(iten => console.log(iten))
/*
LESSON_PAYMENT

PLATFORM_COMMISSION

INSTRUCTOR_TRANSFER

REFUND 
*/