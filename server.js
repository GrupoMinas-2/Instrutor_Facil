import express from 'express'
import indexRoutes from './back/routes/index.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)

app.listen(3333)