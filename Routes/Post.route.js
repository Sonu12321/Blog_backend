import express from 'express'
import { verifyToken } from '../Utils/Verifyuser.js'
import { create, deleteposts, getposts,updatepost } from '../controllers/Post.controller.js'

const router = express.Router()

router.post('/create',verifyToken,create)
router.get('/getposts',getposts)
router.delete('/deleteposts/:postId/:userId',verifyToken,deleteposts)
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)
export default router