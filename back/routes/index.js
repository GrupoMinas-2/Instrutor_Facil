import { Router } from 'express' 

import instructorRouter from './instructors_routes.js'
import studentRouter from './students_routes.js'
import staticRoutes from './static_routes.js'


const indexRoutes = Router()


indexRoutes.use("/instructors", instructorRouter)
indexRoutes.use("/students", studentRouter)
indexRoutes.use("/Instrutor_Facil", staticRoutes)

export default indexRoutes