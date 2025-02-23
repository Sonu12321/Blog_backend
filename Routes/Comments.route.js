import express from 'express'
// import createComment from '../controllers/comment.controller.js'
import { createComment, deleteComment, editComment, getcomments, getPostComments, likeComment } from '../controllers/comment.controller.js'
import { verifyToken } from '../Utils/Verifyuser.js'


const router = express.Router()

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);

export default router;