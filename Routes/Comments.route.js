import express from 'express'
// import createComment from '../controllers/comment.controller.js'
import { createComment, getPostComments } from '../controllers/comment.controller.js'
import { verifyToken } from '../Utils/Verifyuser.js'


const router = express.Router()

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
export default router;