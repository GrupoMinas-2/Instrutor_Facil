import { Router } from 'express' 

import staticRoutes from './static_routes.js'
import instructorRouter from './instructors_routes.js'
import studentRouter from './students_routes.js'
import lessonRouter from './lessons_routes.js'

const indexRoutes = Router()

indexRoutes.use("/Instrutor_Facil", staticRoutes)
indexRoutes.use("/instructors", instructorRouter)
indexRoutes.use("/students", studentRouter)
indexRoutes.use("/lesson", lessonRouter)

export default indexRoutes