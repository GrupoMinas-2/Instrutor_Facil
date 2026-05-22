import express from 'express'
import { Router } from 'express'
import path from "path";

const staticRoutes = Router()

staticRoutes.use(express.static('front/'))

export default staticRoutes