import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Useroutes from './Routes/User.routes.js'
import Authroute from './Routes/Auth.route.js'
import postRoutes from './Routes/Post.route.js'
import cookieParser from 'cookie-parser'
// import Comments from './Routes/Comments.route.js'
import commentRoutes from './Routes/Comments.route.js';

const app = express()

app.use(express.json())
app.use(cookieParser())

dotenv.config({
    path: './.env'
})



mongoose.connect(`${process.env.DATABASE}`).then(() => { console.log("Connected to MongoDB") }).catch((err) => { console.log(err) })

app.use('/api/user',Useroutes)
app.use('/api/auth',Authroute)
app.use('/api/post',postRoutes)
app.use('/api/comment', commentRoutes);



app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'invalid syntax'

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})



app.listen(process.env.PORT || 5000,()=>{
    console.log(`server is running ${process.env.PORT}`)
})
