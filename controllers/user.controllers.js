import User from '../models/user.model.js';
import mongoose from 'mongoose';


export const getAllUsers=async(req,res,next)=>{
    try {
        let users=await User.find();
        res.status(200).json({status:"success",data:users});
    } catch (error) {
        next(error);
    }
}

export const getUserById=async(req,res,next)=>{
    try {
        let {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            let error=new Error("Invalid ID");
            error.statusCode=400;
            throw error;
        }
        let user=await User.findById(id);
        if(!user){
            let error=new Error("User not found");
            error.statusCode=404;
            throw error;
        }
        res.status(200).json({status:"success",data:user});
    } catch (error) {
        next(error);
    }
}