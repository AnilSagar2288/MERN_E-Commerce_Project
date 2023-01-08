import jwt from 'jsonwebtoken'
import User from '../models/userModel.js' 
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req,res,next) =>{
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token,process.env.SECRET_KEY)
            req.user = await User.findById(decoded.id).select('-password')
        } catch (error) {
            console.log(error)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token")
    }

    next()
})

const admin = asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        console.log("anil");
        res.status(401)
        throw new Error("Authorized user is not Admin")
    }
})

export {protect,admin}