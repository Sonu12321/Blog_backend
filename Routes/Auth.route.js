import express from 'express'
import { authgoogle, signin, signup } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signin',signin)
router.get('/sign',signin)
router.post('/signup',signup)
router.post('/google',authgoogle)

export default router