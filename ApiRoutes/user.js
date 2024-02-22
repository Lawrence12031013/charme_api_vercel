import express from 'express'
import { updatedUser, deleteUser, getUsers, getUser } from '../RoutesController/user.js'
import { verifyUser, verifyAdmin } from '../JWT_Token.js'

const router = express.Router()

router.get('/', verifyAdmin, getUsers)

router.get('/:id', verifyUser, getUser)

router.put('/:id', verifyUser, updatedUser)

router.delete('/:id', verifyAdmin, deleteUser)

export default router