import express from 'express'

const app= express()

app.get('/', (req , res)=>{
    res.send('primeira rota')
})

app.listen(3333)