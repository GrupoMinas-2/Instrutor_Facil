import express from 'express'
import { Router } from 'express'

const staticRoutes = Router()

staticRoutes.use(express.static('./front/template'))

export default staticRoutes