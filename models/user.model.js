import { Schema,model } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: [true,"User name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true,"User email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/,"Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
},{timestamps:true});


export default model('User',userSchema);