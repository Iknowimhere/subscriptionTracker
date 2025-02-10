import { JWT_SECRET } from "../config/env.js";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const authorize = async (req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            let error = new Error("Unauthenticated");
            error.statusCode = 401;
            throw error;
        }
        let decodedToken = await jwt.verify(token, JWT_SECRET);
        let user=await User.findById(decodedToken.id);
        if(!user){
            let error=new Error("Unauthenticated");
            error.statusCode=401;
            throw error;
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}