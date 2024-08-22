import express from 'express'
import { deleteUser, getUsers, signout, test, updateUser } from '../controllers/User.controller.js'
import { verifyToken } from '../Utils/Verifyuser.js'

const router = express.Router()

router.get('/test',test)
router.put('/updates/:userId',verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/Signout',signout)
router.get('/getusers',verifyToken,getUsers)

export default router