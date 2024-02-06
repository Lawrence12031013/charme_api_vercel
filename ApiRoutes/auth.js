import express from 'express'
import { Register, Login, AdminLogin } from '../RoutesController/auth.js'
import { verifyAdmin } from '../JWT_Token.js'

const router = express.Router()

router.post('/register', Register)
router.post('/login', Login)
router.post('/admin', AdminLogin)

export default router