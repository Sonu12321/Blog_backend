import { errorcode } from "../Utils/Error.js"
import User from "../models/User.model.js"
import bcryptjs from 'bcryptjs';

export const test = (req,res)=>{
    res.json({message:"Hello World!"})
}
export const updateUser=async (req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorcode(400,'you are not allowed '))
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
          return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20)
            {
            return next(errorcode(400,'username must be between 7 and 20 characters'))
        }
        
    if(req.body.username.includes(' ')){
        return next(errorcode(400,'accha se likh'))
    }
  }
    try {
        const updateUser =await User.findByIdAndUpdate(
            req.params.userId,
            {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.body.profilePicture
            },
        }, {new :true})
        const {password,...rest} = updateUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser =async(req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorcode(400,'id didnt match'))
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has been deleted');
      } catch (error) {
        next(error);
      }
}

export const signout = async(req,res,next)=>{
    try{
        res.clearCookie('access_token').status(200).json('user is deleted')
    }
    catch(error){
        next(error)
    }
}

export const getUsers = async (req, res, next) => {
    // Use correct casing for the user ID field
    if (!req.user.id) {
      return next(errorcode(400, 'invalid user'));
    }
  
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === 'asc' ? 1 : -1;
  
      const users = await User.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const usersWithoutPassword = users.map((user) => {
        const { password, ...rest } = user._doc;
        return rest;
      });
  
      const totalUsers = await User.countDocuments();
  
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthUsers = await User.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        users: usersWithoutPassword,
        totalUsers,
        lastMonthUsers,
      });
    } catch (error) {
      next(error);
    }
  };