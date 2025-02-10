import User from '../models/user.model.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_EXPIRE, JWT_SECRET } from '../config/env.js';

export const signup=async(req,res,next)=>{
    let session=await mongoose.startSession();
    try {
        let {name,email,password}=req.body;
        let existingUser=await User.findOne({email});
        if(existingUser){
            let error=new Error("User already exists");
            error.statusCode=400;
            throw error;
        }
        session.startTransaction();

        let hashedPassword=await bcrypt.hash(password,12);

        let users=await User.create([{
            name,email,password:hashedPassword
        }],{session:session});


        let token=await jwt.sign({id:users[0]._id},JWT_SECRET,{
            expiresIn:JWT_EXPIRE
        });

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({status:"success",message:"User created Successfully",data:{
            user:users[0],token
        }});
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}


export const signin=async(req,res,next)=>{
    try {
        let {email,password}=req.body;

        let user=await User.findOne({
            email
        }); 

        if(!user){
            let error=new Error("Invalid Credentials");
            error.statusCode=401;
            throw error;
        }
        let validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword){
            let error=new Error("Invalid Credentials");
            error.statusCode=401;
            throw error;
        }
        let token=await jwt.sign({id:user._id},JWT_SECRET,{
            expiresIn:JWT_EXPIRE
        });

        res.status(200).json({status:"success",message:"User logged in successfully",data:{
            user,token
        }});
    } catch (error) {
        next(error);
    }
}


export const signout=(req,res,next)=>{
    try {
        req.user=null;
        res.status(200).json({status:"success",message:"User logged out successfully"});     
    } catch (error) {
        next(error);
    }
}