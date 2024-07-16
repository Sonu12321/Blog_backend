import jwt from 'jsonwebtoken'
import {errorcode} from './Error.js'


export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;

    if(!token){
        return next(errorcode(400,'unauthorized'))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorcode(400,'unauthorized'))
        }
        req.user = user
        next()
    })
}